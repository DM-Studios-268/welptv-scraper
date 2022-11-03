const { interpolater } = require('./interpolater')

const log = console.log
const { interpolateValues } = interpolater({
  log,
})

describe('Interpolater', () => {
  it('should interpolate single string value', () => {
    const env = {
      name: 'foobar',
    }
    const params = {
      test: '<name>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      test: 'foobar',
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('should interpolate chained string values', () => {
    const env = {
      name: 'foobar',
      age: '16',
      date: 'Tomorrow',
    }
    const params = {
      test: '<name> is <age> years old <date>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      test: 'foobar is 16 years old Tomorrow',
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('should interpolate nested string values by dot notation', () => {
    const env = {
      placement: 'first',
      name: {
        first: 'foo',
        last: 'bar',
      },
      age: '16',
      date: 'Tomorrow',
    }
    const params = {
      test: '<name.<placement>> is <age> years old <date>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      test: 'foo is 16 years old Tomorrow',
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('should interpolate nested string values by bracket notation', () => {
    const env = {
      placement: 'first',
      name: {
        first: 'foo',
        last: 'bar',
      },
      age: '16',
      date: 'Tomorrow',
    }
    const params = {
      test: '<name[<placement>]> is <age> years old <date>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      test: 'foo is 16 years old Tomorrow',
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('should interpolate a number value', () => {
    const env = {
      age: 18,
    }
    const params = {
      person: '<age>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      person: 18,
    }

    expect(result).toMatchObject(expectedResult)
  })

  it('should interpolate a bool value', () => {
    const env = {
      flag: true,
    }
    const params = {
      isPerson: '<flag>',
    }

    const result = interpolateValues(params, env)
    const expectedResult = {
      isPerson: true,
    }

    expect(result).toMatchObject(expectedResult)
  })
})
