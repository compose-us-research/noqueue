const HttpError = require('http-errors')

function requiresAdmin (req, res, next) {
  if (req.user && req.user.admin) {
    return next()
  }

  next(new HttpError(401))
}

module.exports = {
  requiresAdmin
}
