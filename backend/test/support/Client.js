const fetch = require('cross-fetch')
const urlResolve = require('../../lib/urlResolve')

class Client {
  constructor ({ baseUrl = 'http://localhost:8080/shop/default/' } = {}) {
    this.baseUrl = baseUrl
    this.cookie = null
  }

  async fetch (url, options = {}) {
    options.headers = new fetch.Headers(options.headers)
    options.headers.set('accept', 'application/json')

    if (this.cookie) {
      options.headers.set('cookie', this.cookie)
    }

    if (options.body) {
      options.headers.set('content-type', 'application/json')
    }

    const [path, query] = url.split('?')

    return fetch(urlResolve(this.baseUrl, path) + (query ? `?${query}` : ''), options)
  }

  async logout () {
    this.cookie = null
  }

  async basicLogin ({ user, password }) {
    const result = await this.fetch('login', {
      headers: {
        authorization: 'Basic ' + Buffer.from(user + ':' + password).toString('base64')
      },
      redirect: 'manual'
    })

    this.cookie = result.headers.get('set-cookie').split(';')[0]
  }

  async tokenLogin ({ token }) {
    const result = await this.fetch(`token?access_token=${token}`, { redirect: 'manual' })

    this.cookie = result.headers.get('set-cookie').split(';')[0]
  }
}

module.exports = Client
