const schema = {
  number: v => [typeof v === 'number', 'Number'],

  string: v => [typeof v === 'string', 'String'],

  boolean: v => [typeof v === 'boolean', 'Boolean'],

  null: v => [v === null, 'null'],
}

const err = (v, e, a) => `Validation error: ${v} expected ${e} got ${a}`

const validate = (schema, data) => {
  const e = []

  Object.keys(data).forEach(key => {
    const res = schema[key](data[key])

    if (!res[0]) {
      e.push(err(key, res[1], data[key]))
    }
  })

  if (e.length > 0) {
    throw new Error(e.join('\n'))
  }

  return data
}

module.exports = {
  schema,
  validate,
}
