const err = (property, expectedType, actualValue) =>
  `Validation error: ${property} expected ${expectedType} got ${actualValue}`

const createErrorMessage = (expectedType, actualValue) => property =>
  err(property, expectedType, actualValue)

const isNil = value => value === null || value === undefined

const schema = {
  number: value => [
    typeof value === 'number',
    value,
    createErrorMessage('Number', value),
  ],

  string: value => [
    typeof value === 'string',
    value,
    createErrorMessage('String', value),
  ],

  boolean: value => [
    typeof value === 'boolean',
    value,
    createErrorMessage('Boolean', value),
  ],

  null: value => [value === null, value, createErrorMessage('null', value)],

  default: defaultValue => value => isNil(value) && defaultValue,
}

const compose = funs => value => funs.reduce((_, fun) => fun(value), null)

const validate = (schema, data) => {
  const newData = Object.assign({}, data)
  const errors = []

  Object.keys(newData).forEach(key => {
    const result = compose([].concat(schema[key]))(newData[key])

    if (!(result instanceof Array)) {
      Object.assign(newData, {
        [key]: result,
      })
    } else if (!result[0]) {
      errors.push(result[2](key))
    }
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  return newData
}

module.exports = {
  schema,
  validate,
}
