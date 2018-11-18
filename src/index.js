const last = a => a[a.length - 1]

const compose = fs => v => fs.reduce((a, f, i) => (i === 0 ? f(v) : f(a)), null)

const err = (p, e, a) => `Validation error: ${p} expected ${e} got ${a}`

const createErrorMessage = (e, a) => p => err(p, e, a)

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

const extend = (k, r, m) => {
  schema[k] = v => [
    r(v),
    v,
    m instanceof Function ? () => m(v) : createErrorMessage(m, v),
  ]
}

const getDefaultValue = e => {
  if (!Array.isArray(e)) return null

  const l = last(e)

  return l instanceof Function ? null : l
}

const validate = (s, d) => {
  const nd = Object.assign({}, d)
  const e = []

  Object.keys(nd).forEach(k => {
    if (nd[k] instanceof Object) {
      try {
        const res = validate(s[k], nd[k])

        console.log(res)
      } catch (err) {
        console.log(err.message)
      }
    } else {
      const defaultValue = getDefaultValue(s[k])
      const rls = [].concat(s[k])
      const res = compose(defaultValue ? rls.slice(0, rls.length - 1) : rls)(
        nd[k],
      )

      if (!res[0] && defaultValue) {
        Object.assign(nd, {
          [k]: defaultValue,
        })
      } else if (!res[0]) {
        e.push(res[2](k))
      }
    }
  })

  if (e.length > 0) {
    throw new Error(e.join('\n'))
  }

  return nd
}

module.exports = {
  schema,
  extend,
  validate,
  compose,
}
