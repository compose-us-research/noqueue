const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const ticket = require('./ticket')
const timeslot = require('./timeslot')
const user = require('./user')

function shop ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    console.log(req.user)

    if (req.accepts('html')) {
      return next()
    }

    const config = await db.getConfig()

    res.json({
      '@id': req.absoluteUrl(),
      label: config.label
    })
  })

  router.put('/', bodyParser.json(), async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.setConfig(req.body)

    res.status(201).end()
  })

  router.get('/login', passport.authenticate('basic'), (req, res) => {
    if (!req.user) {
      return next(new Error('auth failed'))
    }

    res.redirect('.')
  })

  router.get('/token', passport.authenticate('bearer'), (req, res, next) => {
    if (!req.user) {
      return next(new Error('auth failed'))
    }

    res.redirect('.')
  })

  router.use('/ticket', ticket({ db }))
  router.use('/timeslot', timeslot({ db }))
  router.use('/user', user({ db }))

  return router
}

module.exports = shop
