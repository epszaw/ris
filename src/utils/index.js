const err = (property, expectedType, actualValue) =>
  `Validation error: ${property} expected ${expectedType} got ${actualValue}`

const createErrorMessage = (expectedType, actualValue) => property =>
  err(property, expectedType, actualValue)

const isNil = value => value === null || value === undefined

const compose = funs => value => funs.reduce((_, fun) => fun(value), null)

module.exports = {
  err,
  createErrorMessage,
  isNil,
  compose,
}
