const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

module.exports = ({ input, name }) => ({
  input,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
  output: {
    file: `./${name}`,
    format: 'umd',
    globals: {
      ris: 'rix',
    },
  },
})
