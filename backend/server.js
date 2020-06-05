const debug = require('debug')('noqueue-server')
const { resolve } = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Database = require('./lib/db/DatabaseConnection')
const defaults = require('./lib/defaults')
const shops = require('./lib/middleware/shops')

const config = {
  port: process.env.PORT || 80,
  db: {
    user: process.env.DB_USER || defaults.db.user,
    host: process.env.DB_HOST || defaults.db.host,
    database: process.env.DB_DATABASE || defaults.db.database,
    password: process.env.DB_PASSWORD || defaults.db.password,
    port: process.env.DB_PORT || defaults.db.port
  }
}

async function init () {
  try {
    const app = express()

    // setup express to listen to x-forwarded-* headers
    app.set('trust proxy', true)

    app.use(morgan('combined'))
    if (process.env.NODE_ENV === 'development') {
      app.use(
        cors({
          origin: (_origin, callback) => callback(null, true),
          exposedHeaders: ['location']
        })
      )
    }

    const frontendPath = resolve(__dirname, '../frontend/build')
    debug(`mount frontend from ${frontendPath}`)
    app.use(express.static(frontendPath))
    app.use((req, res, next) => {
      // if browsers want an html, forward it to the frontend app
      if (req.accepts(['html', 'json', 'png']) !== 'html') {
        return next()
      }

      res.sendFile(resolve(frontendPath, 'index.html'))
    })

    const db = new Database(config.db)
    await db.init()

    const shopRouter = await shops({ db, dbConfig: config.db })
    app.use('/shop', shopRouter)

    const server = app.listen(config.port, () => {
      console.log(`listening at http://localhost:${server.address().port}/`)
    })
  } catch (err) {
    console.error(err)
  }
}

init()
