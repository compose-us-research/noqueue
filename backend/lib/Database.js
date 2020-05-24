const debug = require('debug')('noqueue-database')
const { Client } = require('pg')
const defaults = require('./defaults')
const tables = require('./tables')

class Database {
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

    // check if default config exists otherwise create default config
    if (!(await this.getConfig())) {
      debug(`create default config`)

      await this.addConfig(defaults.config)
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

  async addConfig (config, name = 'default') {
    await this.deleteConfig(name)

    const query =
      'INSERT INTO config("name", "data") VALUES ($1, $2) RETURNING *'
    const values = [name, config]
    const result = await this.client.query(query, values)

    return result.rows[0].data
  }

  async setConfig (config, name = 'default') {
    const query = 'UPDATE config SET "data"=$1 WHERE "name"=$2'
    const values = [config, name]
    await this.client.query(query, values)
  }

  async getConfig (name = 'default') {
    const result = await this.client.query('SELECT * FROM config')

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0].data
  }

  async deleteConfig (name = 'default') {
    await this.client.query('DELETE FROM config WHERE "name" = $1', [name])
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
  SELECT "start", MIN("raw_end") AS "end" FROM (
      SELECT "start" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION
      SELECT "end" AS "start" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION
      SELECT "range"."day" + "timeslots"."start" AS "start" FROM (
        SELECT generate_series AS "day" FROM generate_series($1::timestamp, $2, '24 hours')
      ) AS "range", timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")
      ORDER BY "start"
    ) AS "start", (
      SELECT "start" AS "raw_end" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION
      SELECT "end" AS "raw_end" FROM tickets WHERE "start" >= $1::timestamp AND "end" <= $2::timestamp UNION
      SELECT "range"."day" + "timeslots"."end" AS "end" FROM (
        SELECT generate_series AS "day" FROM generate_series($1::timestamp, $2, '24 hours')
      ) AS "range", timeslots WHERE timeslots.day = EXTRACT(DOW FROM "range"."day")
      ORDER BY "raw_end"
    ) AS "end"
  WHERE "start" < "raw_end"
  GROUP BY "start"
) AS "range"
LEFT JOIN tickets "booked" ON (
  ("booked"."start" <= "range"."start" AND "booked"."end" > "range"."start") OR
  ("booked"."start" < "range"."end" AND "booked"."end" >= "range"."end")
)
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

  async addTimeslot ({ day, start, end, customers, minDuration, maxDuration }) {
    const query =
      'INSERT INTO timeslots("day", "start", "end", "customers", "min_duration", "max_duration") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [day, start, end, customers, minDuration, maxDuration]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async getTimeslots () {
    const query = 'SELECT * FROM timeslots'
    const result = await this.client.query(query)

    return result.rows
  }

  async clearTimeslots () {
    await this.client.query(tables.timeslots.clear)
  }
}

module.exports = Database
