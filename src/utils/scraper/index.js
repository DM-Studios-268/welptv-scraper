const { readFile } = require('fs/promises')
const { factory } = require('./scraper')

const functions = {
  request: async (params, data) => {

  },
}

const scraper = factory({
  functions,
  readFile,
  log: console.log,
})

module.exports = { scraper }
