const debug = require('debug')('noqueue-server')
const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const ShopConnection = require('../db/ShopConnection')
const admin = require('./admin')
const shop = require('./shop')

function nameToPrefix (name) {
  return name.toLowerCase().replace(/[^a-z]/gi, '_')
}

function nameToPath (name) {
  return name.toLowerCase().replace(/[^a-z]/gi, '-')
}

async function shops ({ db, dbConfig }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  const shops = await db.getShops()

  router.get('/', async (req, res, next) => {
    const shops = await db.getShops()
    res.json({
      member: shops.map(shop => ({
        ...shop.data,
        '@id': `${req.absoluteUrl()}/${shop.name}`
      }))
    })
  })

  shops.forEach(async shopConfig => {
    const prefix = nameToPrefix(shopConfig.name)
    const path = nameToPath(shopConfig.name)
    debug(`mounting shop at /shop/${path}`)
    const shopConnection = new ShopConnection({
      ...dbConfig,
      name: path,
      prefix
    })
    await shopConnection.init()
    router.use(`/${path}/admin`, admin({ db: shopConnection }))
    router.use(
      `/${path}`,
      shop({
        db: shopConnection
      })
    )
  })

  router.post('/', bodyParser.json(), async (req, res, next) => {
    const { config, name } = req.body
    const prefix = nameToPrefix(name)
    const path = nameToPath(name)
    await db.addShop(config, path, prefix)
    const shopConnection = new ShopConnection({
      ...dbConfig,
      name: path,
      prefix
    })
    await shopConnection.init()

    router.use(`/${path}/admin`, admin({ db: shopConnection }))
    router.use(
      `/${path}`,
      shop({
        db: shopConnection
      })
    )
    res.status(201).end()
  })

  return router
}

module.exports = shops
