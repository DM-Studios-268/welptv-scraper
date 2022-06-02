const { factory } = require('./scraper')
const { resolvers } = require('../resolvers')
const { getServer } = require('../getServer')

const scraper = factory({
  resolvers,
  getServer,
  log: console.log,
})

module.exports = { scraper }
