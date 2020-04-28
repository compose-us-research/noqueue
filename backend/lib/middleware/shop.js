const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const slot = require('./slot')

function shop ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const config = await db.getConfig()

    res.json({
      '@id': req.absoluteUrl(),
      label: config.label,
      maxCustomers: config.maxCustomers,
    })
  })

  router.put('/', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.setConfig(req.body)

    res.status(201).end()
  })

  router.use('/slot', slot({ db }))

  return router
}

module.exports = shop
