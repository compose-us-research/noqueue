const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const dayslot = require('./dayslot')
const ticket = require('./ticket')
const timeslot = require('./timeslot')

function shop ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    const config = await db.getConfig()

    res.json({
      ...config,
      '@id': req.absoluteUrl()
    })
  })

  router.put('/', bodyParser.json(), async (req, res, next) => {
    await db.setConfig(req.body)

    res.status(201).end()
  })

  router.delete('/', async (req, res, next) => {
    await db.delete()
  })

  router.use('/dayslot', dayslot({ db }))
  router.use('/ticket', ticket({ db }))
  router.use('/timeslot', timeslot({ db }))

  return router
}

module.exports = shop
