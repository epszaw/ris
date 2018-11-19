/**
 * Pipes multiple functions in one and returns it
 * It accepts one argument and using for processing value through rules list
 * @param {Array<Function>} fs Functions which will be piped
 * @returns {Function} Composition for rules processing
 */
const compose = fs => v => fs.reduce((a, f, i) => (i === 0 ? f(v) : f(a)), null)

/**
 * Create default error message
 * @param {String} p Property, which validation failed
 * @param {String} e Expected type, which was expected by rule
 * @param {*} a Actual value, which was received
 */
const err = (p, e, a) => `Validation error: ${p} expected ${e} got ${a}`

/**
 * Default error messages factory, which helps to easily build messages during validation
 * @param {String} e Expected type
 * @param {*} a Actual value
 * @returns {Function} Default error messages factory
 */
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

/**
 * Register rule by given key, which will be avilable as schema property
 * It is the main point to extends ris schemas logic
 * @param {String} k Key, rule key
 * @param {Function} r Rule handler, function that process incoming value. Must returns boolean
 *  value.
 *  Accepts actual value.
 * @param {Function} m Error message factory, which will be passed to error when validation fails.
 *  Accepts function, that will be receive actual value passed to rule during validation
 */
const rule = (k, r, m) => {
  schema[k] = v => [r(v), v, () => m(v)]
}

/**
 * Returns default value from rules list if last value is not a function
 * @param {Array<*>} r Rules list
 * @returns {*} Default value
 */
const getDefaultValue = r => {
  if (!Array.isArray(r)) return null

  const l = r[r.length - 1]

  return l instanceof Function ? null : l
}

/**
 * Validate data with schema
 * @param {Object} s Schema, schema object created with schema methods (rules). Must includes rules
 *  for properties which must be validated or replaced with default value
 * @param {Object|String} d Data, data which must be validated. Can be serialized JSON or object
 * @param {String} p Path, optional parameter. It used for building paths for errors in nested
 *  schemas
 * @throws Will throw an error with problems describtion on validation failure
 * @returns {Object} Returns given data on validation success
 */
const validate = (s, d, p) => {
  const nd = Object.assign({}, typeof d === 'string' ? JSON.parse(d) : d)
  const e = []

  Object.keys(nd).forEach(k => {
    if (nd[k] instanceof Object) {
      try {
        const res = validate(s[k], nd[k], p ? `${p}.${k}` : k)

        Object.assign(nd, {
          [k]: res,
        })
      } catch (err) {
        e.push(err.message)
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
        e.push(res[2](p ? `${p}.${k}` : k))
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
  rule,
  validate,
  compose,
}
