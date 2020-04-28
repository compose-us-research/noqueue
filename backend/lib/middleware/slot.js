const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const urlResolve = require('../urlResolve')

function slot ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const result = await db.addTimeslot({
      user: 'default',
      start: req.body.start,
      end: req.body.end
    })

    res.status(201).set('location', urlResolve(req.absoluteUrl(), result.id)).end()
  })

  router.get('/available', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const result = await db.availableTimeslots({})

    res.json(result)
  })

  router.get('/:id', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const timeslot = await db.getTimeslot(parseInt(req.params.id))

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
      ready: req.body.ready === 'true',
      used: req.body.used === 'true'
    })

    res.status(201).end()
  })

  return router
}

module.exports = slot
