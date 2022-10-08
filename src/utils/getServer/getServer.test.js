const { mock } = require('../testUtils')
const { factory } = require('./getServer')

describe('getServer', () => {
  it('should return the server config', async () => {
    const serverPath = 'src/sites/serverMap.json'
    const returnValue = {}
    const readFile = mock({
      name: 'readfile',
      once: {
        input: [serverPath],
        output: returnValue,
      },
    })

    const handler = factory({ serverMapPath: serverPath, readFile, log: console.log })
    const result = await handler({ server: 'mesha' })
    expect(result).toBe(returnValue)
  })
})
