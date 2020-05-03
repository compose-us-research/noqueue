const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const urlResolve = require('../urlResolve')

function timeslot ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const result = await db.addTimeslot({
      start: req.body.start,
      end: req.body.end,
      customers: req.body.customers
    })

    res.status(201).set('location', urlResolve(req.absoluteUrl(), result.id)).end()
  })

  router.get('/', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const timeslot = await db.getTimeslots()

    res.json(timeslot)
  })

  router.put('/:id', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.setTimeslot({
      id: parseInt(req.params.id),
      start: req.body.start,
      end: req.body.end,
      customers: req.body.customers
    })

    res.status(201).end()
  })

  return router
}

module.exports = timeslot
