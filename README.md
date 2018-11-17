# ris [![Build Status](https://travis-ci.org/lamartire/ris.svg?branch=master)](https://travis-ci.org/lamartire/ris)

> **R**untime **I**mperceptible **S**chemes

## Installation

```bash
npm i ris
```

```bash
yarn add ris
```

## Usage

```js
import { schema, validate } form 'ris'

const s = {
  foo: schema.string,
  bar: [schema.number, schema.min(10), schema.max(20), 15],
  baz: [schema.string, 'default string value']
}
```

```js
const data = {
  foo: 'foo',
  bar: 28,
  baz: null,
}

validate(s, data)

// Will return
{
  foo: 'foo',
  bar: 15,
  baz: 'default string value',
}
```

```js
import { schema, validate } form 'ris'

const s = {
  foo: schema.string,
  bar: schema.number,
}
const data = {
  foo: 1,
  bar: 'hello'
}

validate(s, data)

// Will throw error with following message
// Validation error: foo expected String got 1
// Validation error: bar expected Number got hello
```

## Extending

```js
import { extend } form 'ris'

const even = (v) => v % 2 === 0

extend('even', even, 'Even')
```

```js
import { schema, validate } from 'ris'

const s = {
  foo: schema.even,
}
const data = {
  foo: 5,
}

validate(s, data)

// Will throw error with following message
// Validation error: foo expected Even got 5
```

```js
import { extend } form 'ris'

const even = (v) => v % 2 === 0

extend('even', even, (v) => `Expect even number, but got – ${v}`)
```

```js
import { schema, validate } from 'ris'

const s = {
  foo: schema.even,
}
const data = {
  foo: 5,
}

validate(s, data)

// Will throw error with following message
// Expect even number, but got - 5
```
