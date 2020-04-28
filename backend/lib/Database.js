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
    if (!await this.getConfig()) {
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

    const query = 'INSERT INTO config("name", "data") VALUES ($1, $2) RETURNING *'
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

  async addTimeslot ({ user, start, end }) {
    const query = 'INSERT INTO timeslots("user", "start", "end") VALUES ($1, $2, $3) RETURNING *'
    const values = [user, start, end]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async setTimeslot ({ id, start, end, ready, used }) {
    const query = 'UPDATE timeslots SET "start"=$1, "end"=$2, "ready"=$3, "used"=$4 WHERE "id"=$5'
    const values = [start, end, ready, used, id]
    await this.client.query(query, values)
  }

  async getTimeslot (id) {
    const query = 'SELECT * FROM timeslots WHERE "id"=$1'
    const values = [id]
    const result = await this.client.query(query, values)

    return result.rows[0]
  }

  async availableTimeslots ({ start, end }) {
    const query = `SELECT DISTINCT t.start, t.end, COUNT(l.*) AS b FROM (
SELECT * FROM 
  ( SELECT a.start AS "start" FROM timeslots a UNION SELECT a.end AS "start"  FROM timeslots a ) a,
  ( SELECT a.start AS "end" FROM timeslots a UNION SELECT a.end AS "end"  FROM timeslots a ) b
  ORDER BY "start", "end"
) AS t, timeslots AS l
WHERE t.start <> t.end AND ( (l.start >= t.start AND l.start < t.end) OR (l.end >= t.start AND l.end < t.end) )
GROUP BY t.start, t.end`

    const values = []

    const result = await this.client.query(query)

    return result.rows
  }
}

module.exports = Database
