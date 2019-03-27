module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // React JSX
    // "ecmaFeatures": {
    //   "jsx": true
    // },
    project: "./tsconfig.json"
    // Vue
    // "extraFileExtensions": [".vue"]
  }
};
