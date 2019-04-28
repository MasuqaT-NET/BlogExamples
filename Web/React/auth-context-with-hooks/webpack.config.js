const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve("./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mjs"]
  },
  plugins: [new HtmlPlugin({ template: path.resolve("./src/index.html") })]
};
