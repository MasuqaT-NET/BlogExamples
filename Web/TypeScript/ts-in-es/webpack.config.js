/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  entry: path.resolve(__dirname, "src/main.ts"),
  module: {
    rules: [
      {
        test: /\.[jtm]sx?$/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"]
  },
  plugins: [new HtmlWebpackPlugin(), new ForkTsCheckerWebpackPlugin()]
};
