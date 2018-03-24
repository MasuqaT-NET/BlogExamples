const snapguidist = require('snapguidist');

module.exports = snapguidist({
  components: 'src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('./config/webpack.config.dev.js'),
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.stories.{js,jsx,ts,tsx}',
    '**/*.d.ts',
  ]
});