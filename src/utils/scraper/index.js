const { readFile } = require('fs/promises')
const { factory } = require('./scraper')
const { resolvers } = require('../resolvers')

const scraper = factory({
  resolvers,
  readFile,
  log: console.log,
})

module.exports = { scraper }
