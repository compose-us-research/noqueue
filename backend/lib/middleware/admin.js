const express = require('express')

function shop ({ db }) {
  const router = new express.Router()

  router.get('/clear', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.clear()

    res.status(201).end()
  })

  router.get('/delete', async (req, res, next) => {
    if (req.accepts('html')) {
      return next()
    }

    await db.delete()

    res.status(201).end()
  })

  return router
}

module.exports = shop
