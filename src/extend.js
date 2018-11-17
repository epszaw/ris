const { createErrorMessage } = require('./utils')
const { schema } = require('./schema')

const extend = (k, r, m) => {
  schema[k] = v => [
    r(v),
    v,
    m instanceof Function ? () => m(v) : createErrorMessage(m, v),
  ]
}

module.exports = {
  extend,
}
