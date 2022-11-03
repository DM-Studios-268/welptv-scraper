const { factory } = require('./scraper')
const { resolvers } = require('../resolvers')
const { getServer } = require('../getServer')
const { interpolateValues } = require('../interpolater')

const scraper = factory({
  interpolateValues,
  resolvers,
  getServer,
  log: console.log,
})

module.exports = { scraper }
