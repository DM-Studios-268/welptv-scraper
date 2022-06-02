const factory = ({
  serverMapPath,
  readFile,
  log,
}) => async ({ server }) => {
  const getJsonFile = async (path) => {
    const config = (await readFile(path)).toString()
    const json = JSON.parse(config)
    return json
  }

  const serverMap = await getJsonFile(serverMapPath)

  const serverPath = serverMap.servers[server]
  const siteConfiguration = await getJsonFile(serverPath)

  return siteConfiguration
}

module.exports = { factory }
