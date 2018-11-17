const err = (p, e, a) => `Validation error: ${p} expected ${e} got ${a}`

const createErrorMessage = (e, a) => p => err(p, e, a)

const isNil = v => v === null || v === undefined

const last = a => a[a.length - 1]

const compose = fs => v => fs.reduce((a, f, i) => (i === 0 ? f(v) : f(a)), null)

const getDefaultValue = e => {
  if (!Array.isArray(e)) return null

  const l = last(e)

  return l instanceof Function ? null : l
}

module.exports = {
  err,
  createErrorMessage,
  isNil,
  compose,
  getDefaultValue,
}
