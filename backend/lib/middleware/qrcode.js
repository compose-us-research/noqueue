const { PassThrough } = require('stream')
const { toFileStream } = require('qrcode')

function middleware (req, res, next) {
  if (!req.accepts('image/png')) {
    return next()
  }

  res.sendQrCode = text => {
    const connect = new PassThrough()
    connect.pipe(res)

    toFileStream(connect, text)
  }

  next()
}

module.exports = middleware
