const fetch = require('node-fetch')

function overlap (start, end) {
  return range => {
    if (range.start <= start && range.end > start) {
      return true
    }

    if (range.start < end && range.end >= end) {
      return true
    }

    return false
  }
}

function isAvailable ({ ranges, start, end }) {
  const available = ranges
    .filter(overlap(start, end)) // find all overlapping ranges
    .filter(range => range.available > 0) // check which ranges are available

  // no available ranges
  if (available.length === 0) {
    return false
  }

  const first = available[0]
  const last = available.slice(-1)[0]

  // first range after start?
  if (first.start > start) {
    return false
  }

  // last range before end?
  if (last.end < end) {
    return false
  }

  const noGap = available.every((current, index, ranges) => {
    const last = ranges[index - 1]

    // ignore first
    if (!last) {
      return true
    }

    // is there a gap between last and current?
    if (last.end.valueOf() !== current.start.valueOf()) {
      return false
    }

    return true
  })

  if (noGap) {
    return available
  }

  return null
}

async function main ({ baseUrl, start, duration }) {
  const end = new Date(start.valueOf() + 24 * 60 * 60 * 1000)

  const res = await fetch(
    `${baseUrl}/ticket/available?start=${start.toISOString()}&end=${end.toISOString()}`,
    {
      headers: {
        accept: 'application/json'
      }
    }
  )

  const result = await res.json()
  const ranges = result.member.map(range => {
    return {
      start: new Date(range.start),
      end: new Date(range.end),
      available: range.available
    }
  })

  for (let current = start.valueOf(); current < end; current += duration) {
    const available = isAvailable({
      ranges,
      start: current,
      end: current + duration
    })

    if (available) {
      console.log(
        `${new Date(current).toISOString()} - ${available
          .map(
            range => `${range.start.toISOString()}/${range.end.toISOString()}`
          )
          .join(',')}`
      )
    } else {
      // console.log(`${(new Date(current)).toISOString()} - not available`)
    }
  }
}

main({
  baseUrl: 'http://localhost:8080/shop/default',
  start: new Date('2020-05-04T00:00:00Z'),
  duration: 17 * 60 * 1000
})
