const moduleFileExtensions = require("react-scripts/config/paths")
  .moduleFileExtensions;

module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["<rootDir>/e2e/**/*.{js,jsx,ts,tsx}"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "react-scripts/config/jest/babelTransform.js"
  },
  moduleFileExtensions
};
