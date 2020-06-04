const debug = require('debug')('noqueue-server')
const { resolve } = require('path')
const express = require('express')
const expressSession = require('express-session')
const cors = require('cors')
const morgan = require('morgan')
const Database = require('./lib/Database')
const defaults = require('./lib/defaults')
const authn = require('./lib/middleware/authn')
const admin = require('./lib/middleware/admin')
const shop = require('./lib/middleware/shop')

const config = {
  port: process.env.PORT || 80,
  db: {
    user: process.env.DB_USER || defaults.db.user,
    host: process.env.DB_HOST || defaults.db.host,
    database: process.env.DB_DATABASE || defaults.db.database,
    password: process.env.DB_PASSWORD || defaults.db.password,
    port: process.env.DB_PORT || defaults.db.port
  },
  path: process.env.SHOP_PATH || 'default',
  express: {
    session: {
      key: process.env.SESSION_KEY || defaults.express.session.key
    }
  },
  auth: {
    operator: {
      user: process.env.OPERATOR_USER || defaults.auth.operator.user,
      password: process.env.OPERATOR_PASSWORD || defaults.auth.operator.password
    }
  }
}

/*
either reverse proxy all of them or have another DB for each of these
www.platzhalter.io/shop/happy-nails
www.platzhalter.io/shop/cundm-friseur-passau
www.platzhalter.io/shop/cundm-friseur-landshut
*/

async function init () {
  try {
    const app = express()

    // retrieve information from all shops in this instance
    const db = new Database(config.db)
    await db.init()

    app.use(morgan('combined'))
    if (process.env.NODE_ENV === 'development') {
      app.use(cors({
        origin: (_origin, callback) => callback(null, true),
        exposedHeaders: ['location']
      }))
    }

    debug('mount express session')
    app.use(expressSession({
      secret: config.express.session.key,
      resave: true,
      saveUninitialized: true
    }))

    debug('mount authn')
    app.use(authn({ config: config.auth, db }))

    const frontendPath = resolve(__dirname, '../frontend/build')
    debug(`mount frontend from ${frontendPath}`)
    app.use(express.static(frontendPath))
    app.use((req, res, next) => { // shouldn't 
      if (req.accepts(['html', 'json', 'png']) !== 'html') {
        return next()
      }

      res.sendFile(resolve(frontendPath, 'index.html'))
    })

    // for around the various shops that are registered as database
    debug('mount admin API at /admin')
    app.use('/admin', admin({ db }))

    debug(`mount shop at /shop/${config.path}`)
    app.use(`/shop/${config.path}`, shop({ db }))
    // end for

    const server = app.listen(config.port, () => {
      console.log(`listening at http://localhost:${server.address().port}/`)
    })
  } catch (err) {
    console.error(err)
  }
}

init()
