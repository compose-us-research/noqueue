const defaults = {
  config: {
    label: 'Shop'
  },
  db: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: null,
    port: null,
  },
  express: {
    session: {
      key: 'random'
    }
  },
  auth: {
    operator: {
      user: 'operator',
      password: 'operator'
    }
  }
}

module.exports = defaults
