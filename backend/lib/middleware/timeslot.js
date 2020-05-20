const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')
const HttpError = require('http-errors')
const { requiresAdmin }  = require('./authz')
const urlResolve = require('../urlResolve')

function timeslot ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', requiresAdmin, bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const startDay = (new Date(req.body.start)).getDay()
    const endDay = (new Date(req.body.start)).getDay()

    if (startDay !== endDay) {
      return next(new HttpError(400, 'start and end must be the same day'))
    }

    const result = await db.addTimeslot({
      day: startDay,
      start: (new Date(req.body.start)).toISOString().slice(11),
      end: (new Date(req.body.end)).toISOString().slice(11),
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

  router.put('/:id', requiresAdmin, bodyParser.json(), async (req, res, next) => {
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
