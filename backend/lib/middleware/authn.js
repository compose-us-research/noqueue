const express = require('express')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const BearerStrategy = require('passport-http-bearer')

function auth ({ config, db }) {
  const router = new express.Router()

  router.use(passport.initialize())
  router.use(passport.session())

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(new BasicStrategy((user, password, done) => {
    if (user !== config.operator.user) {
      return done(null, false)
    }

    if (password !== config.operator.password) {
      return done(null, false)
    }

    done(null, { user, admin: true, operator: true })
  }))

  passport.use(new BearerStrategy(async (token, done) => {
    if (!token) {
      return done(null, false)
    }

    const user = await db.getUserByToken(token)

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  }))

  return router
}

module.exports = auth
