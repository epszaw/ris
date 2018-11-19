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

const validNestedBigData = {
  foo: 'bar',
  bar: true,
  baz: {
    foo: 1,
    bar: {
      foo: 'bar',
    },
  },
}

const invalidNestedBigData = {
  foo: 8,
  bar: undefined,
  baz: {
    foo: 'bar',
    bar: {
      foo: null,
    },
  },
}

module.exports = {
  validNestedData,
  invalidNestedData,
  validNestedBigData,
  invalidNestedBigData,
}
