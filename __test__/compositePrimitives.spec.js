const { schema, validate } = require('src/index')
const {
  primitivesInvalidData,
  primitivesValidData,
} = require('__fixtures__/data/primitive')

describe('composition with default value', () => {
  it('should replace failed', () => {
    const primitivesSchema = {
      foo: [schema.string, schema.default('bar')],
    }

    expect(
      validate(primitivesSchema, {
        foo: null,
      }),
    ).toEqual({
      foo: 'bar',
    })
  })

  it('should replace multiple failed', () => {
    const primitivesSchema = {
      foo: [schema.string, schema.default('bar')],
      beep: [schema.number, schema.default(1)],
    }

    expect(
      validate(primitivesSchema, {
        foo: null,
        beep: undefined,
      }),
    ).toEqual({
      foo: 'bar',
      beep: 1,
    })
  })
})
