const absoluteUrl = require("absolute-url");
const bodyParser = require("body-parser");
const express = require("express");

function dayslot({ db }) {
  const router = new express.Router();

  router.use(absoluteUrl());

  router.get("/", async (req, res, next) => {
    try {
      const dayslots = await db.getDayslots();

      const result = {
        member: dayslots.map((slot) => ({
          id: slot.id,
          customers: slot.customers,
          start: slot.start,
          end: slot.end,
          maxDuration: slot.max_duration,
          minDuration: slot.min_duration,
        })),
      };

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.put("/", bodyParser.json(), async (req, res, next) => {
    try {
      const isZeroOrMore = (n) => {
        try {
          const parsed = parseInt(n, 10);
          return parsed >= 0;
        } catch (e) {
          return false;
        }
      };
      const validates = req.body.member.every((member) => {
        return (
          isZeroOrMore(member.customers) &&
          isZeroOrMore(member.minDuration) &&
          isZeroOrMore(member.maxDuration)
        );
      });

      if (!validates) {
        const error = {
          code: 400,
          message:
            "InvalidRequest - customers, minDuration and maxDuration need to be a number >= 0",
        };
        return res.status(400).send(JSON.stringify(error));
      }

      const datesOnly = req.body.member.every((member) => {
        return (
          /^\d{4,}\-\d\d?\-\d\d?$/.test(member.start) &&
          /^\d{4,}\-\d\d?\-\d\d?$/.test(member.end)
        );
      });

      if (!datesOnly) {
        const error = {
          code: 400,
          message:
            "InvalidRequest - expecting dates only without times for dayslots",
        };
        return res.status(400).send(JSON.stringify(error));
      }

      const overlaps = req.body.member.some((member) => {
        const found = req.body.member.find((slot) => {
          const isSame = slot === member;
          if (isSame) {
            return false;
          }

          return (
            (+new Date(slot.start) <= +new Date(member.start) &&
              +new Date(member.start) <= +new Date(slot.end)) ||
            (+new Date(slot.start) <= +new Date(member.end) &&
              +new Date(member.end) <= +new Date(slot.end))
          );
        });
        return !!found;
      });

      if (overlaps) {
        const error = {
          code: 400,
          message: "InvalidRequest - two day slots overlap",
        };
        return res.status(400).send(JSON.stringify(error));
      }

      await db.replaceDayslots(
        req.body.member.map((member) => ({
          customers: member.customers,
          end: member.end,
          maxDuration: member.maxDuration,
          minDuration: member.minDuration,
          start: member.start,
        }))
      );

      res.status(201).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = dayslot;
