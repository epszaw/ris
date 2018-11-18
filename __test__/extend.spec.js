const { schema, extend, validate } = require('src/index')

describe('extend', () => {
  it('should add new rules to schema and allows to use it', () => {
    extend('even', v => v % 2 === 0, 'Even')

    const extendesSchema = {
      foo: schema.even,
    }

    expect(
      validate(extendesSchema, {
        foo: 2,
      }),
    ).toEqual({
      foo: 2,
    })
    expect(() => {
      validate(extendesSchema, {
        foo: 3,
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('should add new rules to schema with custom error message and allows to use it', () => {
    extend(
      'even',
      v => v % 2 === 0,
      v => `Given value must be even number, got ${v}`,
    )

    const extendesSchema = {
      foo: schema.even,
    }

    expect(() => {
      validate(extendesSchema, {
        foo: 3,
      })
    }).toThrowErrorMatchingSnapshot()
  })
})
