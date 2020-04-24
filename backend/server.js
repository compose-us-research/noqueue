const { resolve } = require('path')
const express = require('express')
const morgan = require('morgan')
const shop = require('./lib/shop')

const configs = [{
  path: 'coop-basel',
  label: 'Coop Basel',
  maxCustomers: 10
}, {
  path: 'migros-basel',
  label: 'Migros Basel',
  maxCustomers: 20
}]

const app = express()

app.use(morgan('combined'))

// mount all shop instances
for (const config of configs) {
  app.use(`/shop/${config.path}`, shop(config))
}

// host frontend
app.use(express.static(resolve(__dirname, '../frontend/build')))

// start server on PORT or 80
const server = app.listen(process.env.PORT || 80, () => {
  console.log(`listening at http://localhost:${server.address().port}/`)
})
