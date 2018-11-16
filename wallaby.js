module.exports = wallaby => {
  return {
    files: ['index.js', '__test__/__fixtures__/**/*'],
    tests: ['__test__/**/*.spec.js'],
    env: {
      type: 'node',
    },
    testFramework: 'jest',
  }
}
