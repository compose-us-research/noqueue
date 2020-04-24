const { URL } = require('url')
const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')

function shop (config) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    res.json({
      '@id': req.absoluteUrl(),
      label: config.label,
      maxCustomers: config.maxCustomers,
    })
  })

  router.get('/slot/available', (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    res.json([{
      from: new Date(),
      to: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }])
  })

  router.post('/slot', bodyParser.json(), (req, res, next) => {
    next()
  })

  return router
}

module.exports = shop
