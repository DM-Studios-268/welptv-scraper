const interpolater = ({
  log,
}) => {
  const interpolateValues = (params, data) => {
    const traverse = (key) => {
      return key.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((prev, part) => {
        return prev[part]
      }, data)
    }

    const interpolate = (string) => {
      if (string.includes('<')) {
        const start = (string.lastIndexOf('<') + 1)
        const end = (string.indexOf('>', start))
        const key = string.substring(start, end)
        const traversed = traverse(key)

        const num = Number(traversed)
        const isSingleNumber = (!isNaN(num)) && ['"', '\''].includes(string[start - 2]) && ['"', '\''].includes(string[end + 1])
        // if it is a number, then return the number
        const newString = string.replace(isSingleNumber ? `"<${key}>"` : `<${key}>`, traversed)

        return interpolate(newString)
      }

      return string
    }

    const string = JSON.stringify(params)
    const interpolated = interpolate(string)
    log(interpolated)
    return JSON.parse(interpolated)
  }

  return { interpolateValues }
}

module.exports = { interpolater }
