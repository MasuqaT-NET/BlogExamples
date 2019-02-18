const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/main"),
  output: {
    filename: "[hash:20].main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "src/*.json"),
        to: path.resolve(__dirname, "dist"),
        flatten: true
      }
    ])
  ]
};
