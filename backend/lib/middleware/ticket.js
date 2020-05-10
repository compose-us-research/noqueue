const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const qrcode = require('./qrcode')
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

    const result = await db.availableTickets({})

    res.json(result)
  })

  router.get('/:id', qrcode, async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const ticket = await db.getTicket(parseInt(req.params.id))

    // not found?
    if (!ticket) {
      return next()
    }

    // sendQrCode is only attached if images are accepted
    if (res.sendQrCode) {
      return res.sendQrCode(req.absoluteUrl())
    }

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
