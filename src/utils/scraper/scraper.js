const factory = ({ getServer, functions, log }) => async (data) => {
  const interpolateValues = (params, data) => {
    const interpolate = (string) => {
      if (!string.includes('~')) {
        return string
      }
      const start = string.indexOf('~')
      const end = string.indexOf('~', start + 1)
      const key = string.substring(start, end + 1)
      const newString = string.replace(`~${key}~`, data[key])

      return interpolate(newString)
    }

    const string = JSON.stringify(params)
    return interpolate(string)
  }

  const { env: serverEnv, actions } = await getServer({
    server: data.server,
  })

  const steps = actions[data.action]
  const initialValue = {
    ...serverEnv,
    ...data.params,
  }

  // for each step in this [action]
  const result = await Object.entries(steps).reduce(async (prevPromise, [key, value]) => {
    const globalVaribales = await prevPromise // get global variables

    const [funcName, params] = value
    // place the global varibales into this step's parameters
    const populatedParams = interpolateValues(params, globalVaribales)

    // run the function, passing in the populated parameters and the global variables
    const stepResult = await functions[funcName](populatedParams, globalVaribales)

    return {
      ...globalVaribales,
      [key]: stepResult,
    }
  }, initialValue)

  return result
}

module.exports = { factory }
