const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const urlResolve = require('../urlResolve')

function ticket ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const result = await db.addTicket({
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

    const start = (req.query.start && new Date(req.query.start)) || new Date(Date.now() - 24 * 60 * 60 * 1000)
    const end = (req.query.end && new Date(req.query.end)) || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const result = await db.availableTickets({ start, end })

    res.json(result)
  })

  router.get('/:id', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const ticket = await db.getTicket(parseInt(req.params.id))

    res.json(ticket)
  })

  router.put('/:id', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.setTicket({
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

module.exports = ticket
