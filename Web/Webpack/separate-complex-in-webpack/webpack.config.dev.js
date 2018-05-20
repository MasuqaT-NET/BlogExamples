const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    "index": path.resolve(__dirname, "./src/index.html"),
    "detail": path.resolve(__dirname, "./src/detail.html"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js/, // required from inline embed in HTML file.
        use: [
          {
            loader: "noop-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        rules: [
          {
            resourceQuery: /marker=fragment/, // specified this name by option "marker" of ./loader.js
            oneOf: [
              {
                resourceQuery: /type=css/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader"
                ]
              },
              {
                resourceQuery: /type=html/,
                use: ExtractTextPlugin.extract({
                  use: "html-loader"
                })
              },
              {
                resourceQuery: /type=js/,
                use: [
                  {
                    loader: 'noop-loader'
                  }
                ]
              }
            ]
          },
          {
            loader: "./loader.js",
            options: {
              marker: 'fragment'
            },
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: "eval",
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  },
  plugins: [
    new ExtractTextPlugin('[name].html'),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};