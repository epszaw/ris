const validNestedData = {
  foo: 'bar',
  bar: {
    baz: 1,
  },
}
const invalidNestedData = {
  foo: 'bar',
  bar: {
    baz: 'foo',
  },
}

module.exports = {
  validNestedData,
  invalidNestedData,
}
