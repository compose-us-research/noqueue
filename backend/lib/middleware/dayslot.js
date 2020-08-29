const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')

function dayslot ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    try {
      const dayslots = await db.getDayslots()

      const result = {
        member: dayslots
      }

      res.json(result)
    } catch (err) {
      next(err)
    }
  })

  router.put('/', bodyParser.json(), async (req, res, next) => {
    try {
      await db.replaceDayslots(
        req.body.member.map(member => ({
          customers: member.customers,
          end: member.end,
          maxDuration: member.maxDuration,
          minDuration: member.minDuration,
          start: member.start
        }))
      )

      res.status(201).end()
    } catch (err) {
      next(err)
    }
  })

  return router
}

module.exports = dayslot
