const debug = require('debug')('noqueue-database')
const { Client } = require('pg')
const defaults = require('../defaults')
const tables = require('./tables')

class DatabaseConnection {
  constructor ({ user, host, database, password, port }) {
    this.client = new Client({ user, host, database, password, port })
  }

  async init () {
    await this.client.connect()

    // check if tables exist otherwise run create script
    for (const [table, config] of Object.entries(tables)) {
      const exists = await this.exists(table)

      if (!exists) {
        debug(`${table} doesn't exist, running create script`)

        await this.client.query(config.create)
      }
    }
  }

  disconnect () {
    this.client.end()
  }

  async clear () {
    for (const [table, config] of Object.entries(tables)) {
      await this.client.query(config.clear)
    }
  }

  async delete () {
    for (const [table, config] of Object.entries(tables)) {
      await this.client.query(config.delete)
    }
  }

  async exists (name) {
    const query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE  table_schema = 'public' AND table_name = $1)`
    const values = [name]
    const result = await this.client.query(query, values)

    return result.rows[0].exists
  }

  async addShop (config, name, prefix) {
    const query =
      'INSERT INTO shops("name", "prefix", "data") VALUES ($1, $2, $3) RETURNING *'
    const values = [name, prefix, config]
    const result = await this.client.query(query, values)

    return result.rows[0].data
  }

  async getShop (name = 'default') {
    const query = 'SELECT * FROM shops WHERE "name"=$1'
    const values = [name]
    const result = await this.client.query(query, values)

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0].data
  }

  async getShops () {
    const result = await this.client.query('SELECT * FROM shops')

    return result.rows
  }

  async addTicket ({ id, start, end, contact }) {
    const query =
      'INSERT INTO tickets("id", "start", "end", "contact") VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [id, start, end, contact]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async setTicket ({ id, start, end, contact }) {
    const query =
      'UPDATE tickets SET "start"=$1, "end"=$2, "contact"=$3 WHERE "id"=$4'
    const values = [start, end, contact, id]
    await this.client.query(query, values)
  }

  async getTicket (id) {
    const query = 'SELECT * FROM tickets WHERE "id"=$1'
    const values = [id]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async availableTickets ({ start, end }) {
    const query = `
SELECT "range"."start", "range"."end", COUNT("booked".*)::integer AS "reserved", COALESCE("timeslots"."customers", 0) AS "allowed", COALESCE("timeslots"."customers", 0) - COUNT("booked".*)::integer AS "available" FROM (
  -- combine the start and end timestamps to ranges 
  SELECT "start", MIN("raw_end") AS "end" FROM (
      -- the next 3 selects combine all possible start timestamps for varying number of allowed and reserved customers 
  
      -- find all tickets issued in the given time range and get start...
      SELECT "start" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

      -- ...and end date
      SELECT "end" AS "start" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

      -- combine the day range with the start time of the timeslot matching the day of week
      SELECT "range"."day" + "timeslots"."start" AS "start" FROM (
        -- create timestamps for each day from start to end with the time 00:00:00.000 
        SELECT generate_series AS "day" FROM generate_series(($1::date)::timestamp, $2, '24 hours')
      ) AS "range", timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")

      ORDER BY "start"
    ) AS "start", (
      -- the next 3 selects combine all possible end timestamps for varying number of allowed and reserved customers
    
      -- find all tickets issued in the given time range and get start...
      SELECT "start" AS "raw_end" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

      -- ...and end date
      SELECT "end" AS "raw_end" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION
      
      -- combine the day range with the end time of the timeslot matching the day of week
      SELECT "range"."day" + "timeslots"."end" AS "end" FROM (
        -- create timestamps for each day from start to end with the time 00:00:00.000
        SELECT generate_series AS "day" FROM generate_series(($1::date)::timestamp, $2, '24 hours')
      ) AS "range", timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")

      ORDER BY "raw_end"
    ) AS "end"
  WHERE "start" < "raw_end"
  GROUP BY "start"
) AS "range"
-- add the tickets for the built ranges
LEFT JOIN tickets "booked" ON (
  ("booked"."start" <= "range"."start" AND "booked"."end" > "range"."start") OR
  ("booked"."start" < "range"."end" AND "booked"."end" >= "range"."end")
)
-- add the timeslots for the built ranges
LEFT JOIN timeslots ON (
  ("timeslots"."start" <= CAST("range"."start" AS time) AND "timeslots"."end" > CAST("range"."start" AS time) AND "timeslots"."day" = EXTRACT(DOW FROM "range"."start")) OR
  ("timeslots"."start" < CAST("range"."end" AS time) AND "timeslots"."end" >= CAST("range"."end" AS time) AND "timeslots"."day" = EXTRACT(DOW FROM "range"."start"))
)
GROUP BY "range"."start", "range"."end", "allowed", "timeslots"."customers"
ORDER BY "range"."start"
`
    const values = [start.toISOString(), end.toISOString()]
    const result = await this.client.query(query, values)

    return result.rows
  }

  async replaceTimeslots (listOfSlots) {
    const query = `WITH inserted_ids AS (INSERT INTO timeslots("day", "start", "end", "customers", "min_duration", "max_duration") VALUES ${listOfSlots
      .map((_slot, idx) => {
        const row = idx * 6
        return `($${row + 1}, $${row + 2}, $${row + 3}, $${row + 4}, $${row +
          5}, $${row + 6})`
      })
      .join(
        ','
      )} RETURNING id) DELETE FROM timeslots WHERE id NOT IN (SELECT id FROM inserted_ids)`
    const values = listOfSlots.reduce(
      (acc, { day, start, end, customers, minDuration, maxDuration }) => [
        ...acc,
        day,
        start,
        end,
        customers,
        minDuration,
        maxDuration
      ],
      []
    )
    await this.client.query(query, values)
  }

  async getTimeslots () {
    const query = 'SELECT * FROM timeslots'
    const result = await this.client.query(query)

    return result.rows
  }
}

module.exports = DatabaseConnection
