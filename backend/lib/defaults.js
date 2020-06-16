const defaults = {
  config: prefix => ({
    address: {
      streetAddress: '',
      postalCode: '',
      city: ''
    },
    mail: '',
    maxDuration: '',
    minDuration: '',
    name: 'Shop',
    needsRegistration: false,
    path: prefix
  }),
  db: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: null,
    port: null
  }
}

module.exports = defaults
