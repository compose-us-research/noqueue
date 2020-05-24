const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')
const uuid = require('uuid').v4
const qrcode = require('./qrcode')
const urlResolve = require('../urlResolve')

function ticket ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', bodyParser.json(), async (req, res, next) => {
    try {
      const result = await db.addTicket({
        id: uuid(),
        start: req.body.start,
        end: req.body.end,
        contact: req.body.contact
      })

      res
        .status(201)
        // .set('access-control-expose-headers', 'location')
        .set('location', urlResolve(req.absoluteUrl(), result.id))
        .end()
    } catch (err) {
      next(err)
    }
  })

  router.get('/available', async (req, res, next) => {
    try {
      const start =
        (req.query.start && new Date(req.query.start)) ||
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      const end =
        (req.query.end && new Date(req.query.end)) ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      const available = await db.availableTickets({ start, end })

      const result = {
        member: available
      }

      res.json(result)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', qrcode, async (req, res, next) => {
    const supportedContent = req.accepts('image/png') || req.accepts('application/json')
    if (!supportedContent) {
      next()
    }

    try {
      const ticket = await db.getTicket(req.params.id)

      // not found?
      if (!ticket) {
        return next()
      }

      // sendQrCode is only attached if images are accepted
      if (res.sendQrCode) {
        return res
          .set('content-type', 'image/png')
          .sendQrCode(req.absoluteUrl())
      }

      res.json(ticket)
    } catch (err) {
      next(err)
    }
  })

  router.put('/:id', bodyParser.json(), async (req, res, next) => {
    try {
      await db.setTicket({
        id: req.params.id,
        start: req.body.start,
        end: req.body.end,
        contact: req.body.contact
      })

      res.status(201).end()
    } catch (err) {
      next(err)
    }
  })

  return router
}

module.exports = ticket
