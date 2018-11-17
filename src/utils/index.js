const err = (p, e, a) => `Validation error: ${p} expected ${e} got ${a}`

const createErrorMessage = (e, a) => p => err(p, e, a)

const isNil = v => v === null || v === undefined

const compose = fs => v =>
  fs.reduce((a, f, i) => {
    if (i === 0) {
      return f(v)
    }

    return f(a)
  }, null)

const getDefaultValue = e => {
  if (Array.isArray(e)) {
    const l = e[e.length - 1]

    return l instanceof Function ? null : l
  }

  return null
}

module.exports = {
  err,
  createErrorMessage,
  isNil,
  compose,
  getDefaultValue,
}
