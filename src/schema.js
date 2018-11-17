const { createErrorMessage } = require('./utils')

const schema = {
  number: v => [typeof v === 'number', v, createErrorMessage('Number', v)],

  string: v => [typeof v === 'string', v, createErrorMessage('String', v)],

  boolean: v => [typeof v === 'boolean', v, createErrorMessage('Boolean', v)],

  regexp: e => v => [
    e.test(v),
    v,
    () => `Validation failed: give value ${v} not match to ${e.toString()}`,
  ],

  min: e => v => [
    v[0] === false ? false : v[1] >= e,
    v[1],
    createErrorMessage('min', v[1]),
  ],

  max: e => v => [
    v[0] === false ? false : v[1] <= e,
    v[1],
    createErrorMessage('max', v[1]),
  ],

  null: v => [v === null, v, createErrorMessage('null', v)],
}

module.exports = {
  schema,
}
