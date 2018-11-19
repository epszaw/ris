const { schema, validate } = require('src/index')
const {
  validNestedData,
  invalidNestedData,
} = require('__fixtures__/data/nested')

describe('validate – schema with nested schema', () => {
  it('should correctly validate data with nested objects', () => {
    const nestedSchema = {
      foo: schema.string,
      bar: {
        baz: schema.number,
      },
    }

    expect(validate(nestedSchema, validNestedData)).toEqual({
      foo: 'bar',
      bar: {
        baz: 1,
      },
    })
    expect(() => {
      validate(nestedSchema, invalidNestedData)
    }).toThrow()
  })
})
