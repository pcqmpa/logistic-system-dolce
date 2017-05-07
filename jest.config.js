module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage/',
  modulePaths: ['src', 'tests'],
  moduleNameMapper: {
    '.scss$': 'sass-stub.js'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/config/',
    '/coverage/',
    '/doc/',
    '/webpack/'
  ]
};
