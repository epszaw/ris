const { schema, validate } = require('src/index')
const {
  compositeInvalidData,
  compositeValidData,
} = require('__fixtures__/data/composite')

describe('composition with default value', () => {
  it('should replace multiple fields', () => {
    const primitivesSchema = {
      foo: [schema.string, 'bar'],
      beep: [schema.number, 1],
    }

    expect(validate(primitivesSchema, compositeInvalidData)).toEqual(
      compositeValidData,
    )
  })
})

describe('composition with meta rules', () => {
  it('should correctly validate max and min numbers', () => {
    const compositeSchema = {
      foo: [schema.number, schema.min(2), schema.max(5)],
    }

    expect(
      validate(compositeSchema, {
        foo: 3,
      }),
    ).toEqual({
      foo: 3,
    })
    expect(() =>
      validate(compositeSchema, {
        foo: 8,
      }),
    ).toThrow()
    expect(() =>
      validate(compositeSchema, {
        foo: 1,
      }),
    ).toThrowErrorMatchingSnapshot()
  })

  it('should correctly validate max/min numbers and returns default value', () => {
    const compositeSchema = {
      foo: [schema.number, schema.min(2), schema.max(5), 4],
    }

    expect(
      validate(compositeSchema, {
        foo: 8,
      }),
    ).toEqual({
      foo: 4,
    })
  })
})
