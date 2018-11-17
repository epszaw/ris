const { compose, getDefaultValue } = require('./utils')

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
      const rules = [].concat(s[k])
      const r = compose(
        defaultValue ? rules.slice(0, rules.length - 1) : rules,
      )(nd[k])

      if (!r[0] && defaultValue) {
        Object.assign(nd, {
          [k]: defaultValue,
        })
      } else if (!r[0]) {
        e.push(r[2](k))
      }
    }
  })

  if (e.length > 0) {
    throw new Error(e.join('\n'))
  }

  return nd
}

module.exports = {
  validate,
}
