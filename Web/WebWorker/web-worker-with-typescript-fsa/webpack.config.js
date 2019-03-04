const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/main.ts"),
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  resolve: {
    extensions: [".ts", ".js", ".mjs", ".json"]
  },
  plugins: [new HtmlPlugin()]
};
