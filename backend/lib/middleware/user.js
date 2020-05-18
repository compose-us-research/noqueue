const absoluteUrl = require('absolute-url')
const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid').v4
const { requiresAdmin } = require('./authz')
const urlResolve = require('../urlResolve')

function user ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.post('/', requiresAdmin, bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const result = await db.addUser({
      id: req.body.id,
      label: req.body.label,
      token: uuid(),
      admin: Boolean(req.body.admin)
    })

    res.status(201).set('location', urlResolve(req.absoluteUrl(), result.id)).end()
  })

  router.get('/:id', requiresAdmin, async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    const user = await db.getUser(req.params.id)

    if (!user) {
      return next()
    }

    res.json(user)
  })

  router.put('/:id', requiresAdmin, bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.setUser({
      id: req.body.id,
      label: req.body.label,
      token: req.body.token,
      admin: Boolean(req.body.admin)
    })

    res.status(201).end()
  })

  return router
}

module.exports = user
