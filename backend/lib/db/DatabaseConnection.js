const debug = require('debug')('noqueue-database')
const { Client } = require('pg')
const defaults = require('../defaults')
const migrations = require('./migrations')
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

    // version table should exist now
    const result = await this.client.query(`SELECT current_version FROM version`)
    const initialVersion =
      (result.rows && result.rows[0] && result.rows[0].version) || 0;
    const updateVersionQuery = `UPDATE version SET current_version=$1 WHERE current_version=$2`
    const resultVersion = await migrations.reduce(async (thisUpdate, migration) => {
      const currentVersion = await thisUpdate;
      if (currentVersion < migration.version) {
        debug(`Updating to version ${migration.version}`)
        await migration.update(this.client)
        const values = [migration.version, currentVersion]
        await this.client.query(updateVersionQuery, values)
        return migration.version
      }
      return currentVersion
    }, Promise.resolve(initialVersion))
    debug(`Version of database is ${resultVersion}`)
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
    const result = await this.client.query(`SELECT * FROM shops ORDER BY data->>'name'`)

    return result.rows
  }

}

module.exports = DatabaseConnection
