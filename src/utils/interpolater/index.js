const { interpolater } = require('./interpolater')

const {
  interpolateValues,
} = interpolater({
  log: console.log,
})

module.exports = { interpolateValues }
