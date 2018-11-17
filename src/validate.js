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
  validate,
}
