const factory = ({ readFile, functions, log }) => (data) => {
  const getJsonFile = async (path) => {
    const config = (await readFile(path)).toString()
    const json = JSON.parse(config)
    return json
  }

  const interpolateValues = (params, data) => {
    const interpolate = (string) => {
      if(!string.includes('~')){
        return string
      }
      const start = string.indexOf('~')
      const end = string.indexOf('~', index+1)
      const key = string.substring(start, end+1)
      const newString = string.replace(`~${key}~`, data[key])

      return interpolate(newString)
    }

    const string = JSON.stringify(params)
    return interpolate(string)
  }

  const siteConfig = await getJsonFile('src/sites/serverMap.json')

  const serverPath = siteConfig.servers[data.server]
  const { env: serverEnv, actions } = await getJsonFile(serverPath)

  const steps = actions[data.action]
  const initialValue = {
    ...serverEnv,
    ...data.params,
  }

  const result = Object.entries(steps).reduce((prev, [key, value]) => {
    const [funcName, params] = value
    const populatedParams = interpolateValues(params, prev)
    const stepResult = await functions[funcName](populatedParams, prev)

    return {
      ...prev,
      [key]: stepResult,
    }
  }, initialValue)

  return result
}

modules.exports = { factory }
