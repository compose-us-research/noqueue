const { resolve } = require('path')
const { URL } = require('url')

function urlResolve (baseUrl, path) {
  const url = new URL(baseUrl)

  url.pathname = resolve(url.pathname, path.toString())

  return url.toString()
}

module.exports = urlResolve
