const { err, createErrorMessage, isNil, compose } = require('./utils')

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
