const { schema, validate } = require('src/index')
const {
  validNestedData,
  invalidNestedData,
  validNestedBigData,
  invalidNestedBigData,
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
    }).toThrowErrorMatchingSnapshot()
  })

  it('should correctly validate data with multiple properties mixed with objects', () => {
    const nestedSchema = {
      foo: schema.string,
      bar: schema.boolean,
      baz: {
        foo: schema.number,
        bar: {
          foo: schema.string,
        },
      },
    }

    expect(validate(nestedSchema, validNestedBigData)).toEqual(
      validNestedBigData,
    )
    expect(() => {
      validate(validate(nestedSchema, invalidNestedBigData))
    }).toThrowErrorMatchingSnapshot()
  })
})
