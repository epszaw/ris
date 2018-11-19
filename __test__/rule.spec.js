const { schema, rule, validate } = require('src/index')

describe('rule', () => {
  it('should add new rules to schema and allows to use it', () => {
    rule('even', v => v % 2 === 0, 'Even')

    const ruleesSchema = {
      foo: schema.even,
    }

    expect(
      validate(ruleesSchema, {
        foo: 2,
      }),
    ).toEqual({
      foo: 2,
    })
    expect(() => {
      validate(ruleesSchema, {
        foo: 3,
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('should add new rules to schema with custom error message and allows to use it', () => {
    rule(
      'even',
      v => v % 2 === 0,
      v => `Given value must be even number, got ${v}`,
    )

    const ruleesSchema = {
      foo: schema.even,
    }

    expect(() => {
      validate(ruleesSchema, {
        foo: 3,
      })
    }).toThrowErrorMatchingSnapshot()
  })
})
