const { readFile } = require('fs/promises')
const { factory } = require('./getServer')

const getServer = factory({
  readFile,
  serverMapPath: 'src/sites/serverMap.json',
  log: console.log,
})

module.exports = { getServer }
