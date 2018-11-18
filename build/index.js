const rollup = require('rollup')
const config = require('./rollup.config')

const libMap = [
  {
    input: './src/index.js',
    name: 'ris.min.js',
  },
]

async function build(file) {
  const fileConfig = config(file)
  const bundle = await rollup.rollup(fileConfig)

  await bundle.write(fileConfig.output)
}

;(async () => {
  for (const file of libMap) {
    await build(file)
  }
})()
