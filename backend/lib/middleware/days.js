const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')

function days ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    try {
      const days = await db.getDailyAvailability()
      const holidays = await db.getDayslots()

      const result = {
        days: days,
        holidays: holidays
      }

      res.json(result)
    } catch (err) {
      next(err)
    }
  })

  router.put('/', bodyParser.json(), async (req, res, next) => {
    try {
      if (req.body.days.length !== 7) {
        return res.status(400).end()
      }

      await db.replaceDailyAvailabilityAndHolidays({
        dailyAvailability: req.body.availabilities.map(availability => [
          availability.start,
          availability.end || null,
          Math.abs(parseInt(availability.monday, 10)) || 0,
          Math.abs(parseInt(availability.tuesday, 10)) || 0,
          Math.abs(parseInt(availability.wednesday, 10)) || 0,
          Math.abs(parseInt(availability.thursday, 10)) || 0,
          Math.abs(parseInt(availability.friday, 10)) || 0,
          Math.abs(parseInt(availability.saturday, 10)) || 0,
          Math.abs(parseInt(availability.sunday, 10)) || 0
        ]),
        holidays: req.body.holidays.map(member => ({
          customers: 0,
          end: member.end,
          maxDuration: 0,
          minDuration: 0,
          start: member.start
        }))
      })

      res.status(201).end()
    } catch (err) {
      next(err)
    }
  })

  return router
}

module.exports = days
