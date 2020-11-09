const debug = require('debug')('noqueue-database')
const { Client } = require('pg')
const defaults = require('../defaults')
const tables = require('./shop-tables')

class ShopConnection {
  constructor ({ user, host, database, password, name, prefix, port }) {
    this.client = new Client({ user, host, database, password, port })
    this.name = name
    this.prefix = prefix
  }

  async init () {
    await this.client.connect()

    // check if tables exist otherwise run create script
    for (const [table, config] of Object.entries(tables)) {
      const exists = await this.exists(`${this.prefix}_${table}`)

      if (!exists) {
        debug(`${this.prefix}_${table} doesn't exist, running create script`)

        await this.client.query(config.create(this.prefix))
      }
    }
  }

  disconnect () {
    this.client.end()
  }

  async clear () {
    for (const [table, config] of Object.entries(tables)) {
      await this.client.query(config.clear(this.prefix))
    }
  }

  async delete () {
    for (const [table, config] of Object.entries(tables)) {
      await this.client.query(config.delete(this.prefix))
    }
    await this.client.query('DELETE FROM shops WHERE "name"=$1', [this.name])
  }

  async exists (name) {
    const query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE  table_schema = 'public' AND table_name = $1)`
    const values = [name]
    const result = await this.client.query(query, values)

    return result.rows[0].exists
  }

  async getConfig () {
    const query = 'SELECT * FROM shops WHERE "name"=$1'
    const values = [this.name]
    const result = await this.client.query(query, values)

    console.log('selecting', this.name);
    return result.rows[0].data
  }

  async setConfig (config) {
    const query = 'UPDATE shops SET "data"=$1 WHERE "name"=$2'
    const values = [config, this.name]
    await this.client.query(query, values)
  }

  async addTicket ({ id, start, end, contact }) {
    const query = `INSERT INTO "${this.prefix}_tickets"("id", "start", "end", "contact") VALUES ($1, $2, $3, $4) RETURNING *`
    const values = [id, start, end, contact]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async setTicket ({ id, start, end, contact }) {
    const query = `UPDATE "${this.prefix}_tickets" SET "start"=$1, "end"=$2, "contact"=$3 WHERE "id"=$4`
    const values = [start, end, contact, id]
    await this.client.query(query, values)
  }

  async removeTicket ({ id }) {
    const query = `DELETE FROM "${this.prefix}_tickets" WHERE "id"=$1`
    const values = [id]
    const result = await this.client.query(query, values)
    return result.rowCount
  }

  async getTicket (id) {
    const query = `SELECT * FROM "${this.prefix}_tickets" WHERE "id"=$1`
    const values = [id]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  getAvailableTicketsQuery (slotType) {
    if (slotType === "days" || slotType === "holidays") {
      return this.getAvailableTicketsQueryByDays();
    }
    return this.getAvailableTicketsQueryByTimes();
  }

  getAvailableTicketsQueryByDays () {
    return `
    SELECT "range"."start", "range"."end", COUNT("booked".*)::integer AS "reserved", COALESCE("dayslots"."customers", 0) AS "allowed", COALESCE("dayslots"."customers", 0) - COUNT("booked".*)::integer AS "available" FROM (
      -- combine the start and end timestamps to ranges 
      SELECT "start", MIN("raw_end") AS "end" FROM (
          -- the next 3 selects combine all possible start timestamps for varying number of allowed and reserved customers 

          -- find all tickets issued in the given time range and get start...
          SELECT "start" FROM "${this.prefix}_tickets" WHERE "start" >= $1::date AND "end" <= $2::date UNION

          -- ...and end date
          SELECT "end" AS "start" FROM "${this.prefix}_tickets" WHERE "start" >= $1::date AND "end" <= $2::date UNION

          -- combine the day range with the start time of the available days
          SELECT "dayslots"."start" AS "start" FROM "${this.prefix}_dayslots" AS dayslots WHERE dayslots.start <= $1::date AND $1::date <= dayslots.end

          ORDER BY "start"
        ) AS "start", (
          -- the next 3 selects combine all possible end timestamps for varying number of allowed and reserved customers

          -- find all tickets issued in the given time range and get start...
          SELECT "start" AS "raw_end" FROM "${this.prefix}_tickets" WHERE "start" >= $1::date AND "end" <= $2::date UNION

          -- ...and end date
          SELECT "end" AS "raw_end" FROM "${this.prefix}_tickets" WHERE "start" >= $1::date AND "end" <= $2::date UNION

          -- combine the day range with the end time of the timeslot matching the day of week
          SELECT "dayslots"."end" AS "raw_end" FROM "${this.prefix}_dayslots" AS dayslots WHERE dayslots.start <= $2::date AND $2::date <= dayslots.end

          ORDER BY "raw_end"
        ) AS "end"
      WHERE "start" < "raw_end"
      GROUP BY "start"
    ) AS "range"
    -- add the tickets for the built ranges
    LEFT JOIN "${this.prefix}_tickets" "booked" ON (
      ("booked"."start" <= "range"."start" AND "booked"."end" > "range"."start") OR
      ("booked"."start" < "range"."end" AND "booked"."end" >= "range"."end")
    )
    -- add the dayslots for the built ranges
    LEFT JOIN "${this.prefix}_dayslots" "dayslots" ON (
      ("dayslots"."start" <= CAST("range"."start" AS date) AND "dayslots"."end" > CAST("range"."start" AS date)) OR
      ("dayslots"."start" < CAST("range"."end" AS date) AND "dayslots"."end" >= CAST("range"."end" AS date))
    )
    GROUP BY "range"."start", "range"."end", "allowed", "dayslots"."customers"
    ORDER BY "range"."start"`;
  }

  getAvailableTicketsQueryByTimes () {
    return `
    SELECT "range"."start", "range"."end", COUNT("booked".*)::integer AS "reserved", COALESCE("timeslots"."customers", 0) AS "allowed", COALESCE("timeslots"."customers", 0) - COUNT("booked".*)::integer AS "available" FROM (
      -- combine the start and end timestamps to ranges 
      SELECT "start", MIN("raw_end") AS "end" FROM (
          -- the next 3 selects combine all possible start timestamps for varying number of allowed and reserved customers 

          -- find all tickets issued in the given time range and get start...
          SELECT "start" FROM "${this.prefix}_tickets" WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

          -- ...and end date
          SELECT "end" AS "start" FROM "${this.prefix}_tickets" WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

          -- combine the day range with the start time of the timeslot matching the day of week
          SELECT "range"."day" + "timeslots"."start" AS "start" FROM (
            -- create timestamps for each day from start to end with the time 00:00:00.000 
            SELECT generate_series AS "day" FROM generate_series(($1::date)::timestamp, $2, '24 hours')
          ) AS "range", "${this.prefix}_timeslots" AS timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")

          ORDER BY "start"
        ) AS "start", (
          -- the next 3 selects combine all possible end timestamps for varying number of allowed and reserved customers

          -- find all tickets issued in the given time range and get start...
          SELECT "start" AS "raw_end" FROM "${this.prefix}_tickets" WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

          -- ...and end date
          SELECT "end" AS "raw_end" FROM "${this.prefix}_tickets" WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION

          -- combine the day range with the end time of the timeslot matching the day of week
          SELECT "range"."day" + "timeslots"."end" AS "end" FROM (
            -- create timestamps for each day from start to end with the time 00:00:00.000
            SELECT generate_series AS "day" FROM generate_series(($1::date)::timestamp, $2, '24 hours')
          ) AS "range", "${this.prefix}_timeslots" AS timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")

          ORDER BY "raw_end"
        ) AS "end"
      WHERE "start" < "raw_end"
      GROUP BY "start"
    ) AS "range"
    -- add the tickets for the built ranges
    LEFT JOIN "${this.prefix}_tickets" "booked" ON (
      ("booked"."start" <= "range"."start" AND "range"."start" < "booked"."end") OR
      ("booked"."start" < "range"."end" AND "range"."end" <= "booked"."end")
    )
    -- add the timeslots for the built ranges
    LEFT JOIN "${this.prefix}_timeslots" "timeslots" ON (
      ("timeslots"."start" = "timeslots"."end" AND (
        ("timeslots"."start" <= CAST("range"."start" AS time) AND "timeslots"."day" = EXTRACT(DOW FROM "range"."start")) OR
        (CAST("range"."end" AS time) <= "timeslots"."end" AND "timeslots"."day" = EXTRACT(DOW FROM "range"."end"))
      )) OR ("timeslots"."start" <> "timeslots"."end" AND (
        ("timeslots"."start" <= CAST("range"."start" AS time) AND CAST("range"."start" AS time) < "timeslots"."end" AND "timeslots"."day" = EXTRACT(DOW FROM "range"."start")) OR
        ("timeslots"."start" < CAST("range"."end" AS time) AND CAST("range"."end" AS time) <= "timeslots"."end" AND "timeslots"."day" = EXTRACT(DOW FROM "range"."end"))
      ))
    )
    GROUP BY "range"."start", "range"."end", "allowed", "timeslots"."customers"
    ORDER BY "range"."start"`;
  }

  async availableTickets ({ start, end }) {
    const config = await this.getConfig()
    const query = this.getAvailableTicketsQuery(config.slotType);
    const values = [start.toISOString(), end.toISOString()]
    const result = await this.client.query(query, values)

    return result.rows
  }

  async replaceDailyAvailabilityAndHolidays ({ dailyAvailability, holidays }) {
    try {
      await this.client.query('BEGIN')
      await this.replaceDailyAvailability(dailyAvailability)
      await this.replaceDailyAvailability(holidays)
      await this.client.query('COMMIT')
    } catch (e) {
      await this.client.query('ROLLBACK')
      throw e
    }
  }

  /**
   * Replaces all daily availabilities.
   * @param {array} listOfDailyAvailabilities array of array of start date, end date (or null), min duration, max duration and customers for mon through sun
   */
  async replaceDailyAvailability (listOfDailyAvailabilities) {
    const query = `WITH inserted_ids AS (INSERT INTO "${
      this.prefix
    }_daily_availability" (
      "start",
      "end",
      "min_duration",
      "max_duration",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ) VALUES ${
      listOfDailyAvailabilities.map((_slot, index) => {
        const row = index * 9
        return `(
          ${row + 1},
          ${row + 2},
          ${row + 3},
          ${row + 4},
          ${row + 5},
          ${row + 6},
          ${row + 7},
          ${row + 8},
          ${row + 9}
        )`
      }).join(', ')
    } RETURNING id) DELETE FROM "${
      this.prefix
    }_daily_availability" WHERE id NOT IN (SELECT id FROM inserted_ids)`

    await this.client.query(query, listOfDailyAvailabilities)
  }

  async getDailyAvailability () {
    const query = `SELECT * FROM "${this.prefix}_daily_availability"`
    const result = await this.client.query(query)

    return result.rows[0]
  }

  async replaceDayslots (listOfSlots) {
    const query = `WITH inserted_ids AS (INSERT INTO "${
      this.prefix
    }_dayslots"("start", "end", "customers", "min_duration", "max_duration") VALUES ${listOfSlots
      .map((_slot, idx) => {
        const row = idx * 5
        return `($${row + 1}, $${row + 2}, $${row + 3}, $${row + 4}, $${row + 5})`
      })
      .join(',')} RETURNING id) DELETE FROM "${
      this.prefix
    }_dayslots" WHERE id NOT IN (SELECT id FROM inserted_ids)`
    const values = listOfSlots.reduce(
      (acc, { customers, end, minDuration, maxDuration, start }) => [
        ...acc,
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

  async getDayslots () {
    const query = `SELECT * FROM "${this.prefix}_dayslots"`
    const result = await this.client.query(query)

    return result.rows
  }

  async replaceTimeslots (listOfSlots) {
    const query = `WITH inserted_ids AS (INSERT INTO "${
      this.prefix
    }_timeslots"("day", "start", "end", "customers", "min_duration", "max_duration") VALUES ${listOfSlots
      .map((_slot, idx) => {
        const row = idx * 6
        return `($${row + 1}, $${row + 2}, $${row + 3}, $${row + 4}, $${row +
          5}, $${row + 6})`
      })
      .join(',')} RETURNING id) DELETE FROM "${
      this.prefix
    }_timeslots" WHERE id NOT IN (SELECT id FROM inserted_ids)`
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
    const query = `SELECT * FROM "${this.prefix}_timeslots"`
    const result = await this.client.query(query)

    return result.rows
  }
}

module.exports = ShopConnection
