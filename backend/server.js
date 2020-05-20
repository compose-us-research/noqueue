const debug = require('debug')('noqueue-server')
const { resolve } = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Database = require('./lib/Database')
const defaults = require('./lib/defaults')
const admin = require('./lib/middleware/admin')
const shop = require('./lib/middleware/shop')

const config = {
  port: process.env.PORT || 80,
  db: {
    user: process.env.DB_USER || defaults.db.user,
    host: process.env.DB_HOST || defaults.db.host,
    database: process.env.DB_DATABASE || defaults.db.database,
    password: process.env.DB_PASSWORD || defaults.db.password,
    port: process.env.DB_PORT || defaults.db.port,
  },
  path: process.env.SHOP_PATH || 'default'
}

const whitelist = ["http://localhost:8080", "http://localhost:9009"]

async function init () {
  try {
    const app = express()

    const db = new Database(config.db)
    await db.init()

    app.use(morgan('combined'))
    app.use(cors({
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }))

    debug('mount admin API at /admin')
    app.use('/admin', admin({ db }))

    debug(`mount shop at /shop/${config.path}`)
    app.use(`/shop/${config.path}`, shop({ db }))

    const frontendPath = resolve(__dirname, '../frontend/build')
    debug(`mount frontend from ${frontendPath}`)
    app.use(express.static(frontendPath))
    debug('mount frontend router')
    app.get('*', (_req, res) => res.sendFile(resolve(frontendPath, 'index.html')))

    const server = app.listen(config.port, () => {
      console.log(`listening at http://localhost:${server.address().port}/`)
    })
  } catch (err) {
    console.error(err)
  }
}

init()
