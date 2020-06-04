const absoluteUrl = require('absolute-url')
const bodyParser = require('body-parser')
const express = require('express')
const HttpError = require('http-errors')
const { requiresAdmin }  = require('./authz')

function timeslot ({ db }) {
  const router = new express.Router()

  router.use(absoluteUrl())

  router.get('/', async (req, res, next) => {
    try {
      const timeslots = await db.getTimeslots()

      const result = {
        member: timeslots.map(timeslot => {
          return {
            day: timeslot.day,
            start: timeslot.start,
            end: timeslot.end,
            customers: timeslot.customers,
            minDuration: timeslot.min_duration,
            maxDuration: timeslot.max_duration
          }
        })
      }

      res.json(result)
    } catch (err) {
      next(err)
    }
  })

  router.put('/', requiresAdmin, bodyParser.json(), async (req, res, next) => {
    
    try {
      await db.replaceTimeslots(req.body.member.map(member => ({
        day: member.day,
        start: member.start,
        end: member.end,
        customers: member.customers,
        minDuration: member.minDuration,
        maxDuration: member.maxDuration
      })))

      res.status(201).end()
    } catch (err) {
      next(err)
    }
  })

  return router
}

module.exports = timeslot
