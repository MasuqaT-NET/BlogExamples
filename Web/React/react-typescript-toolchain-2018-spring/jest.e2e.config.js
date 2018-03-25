module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['<rootDir>/e2e/**/*.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/config/jest/typescriptTransform.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  globals: {
    'host': 'localhost:5001'
  }
};
