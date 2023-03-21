const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.ts",
  devServer: {
    open: true,
    host: "localhost",
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: ["public/webpack.svg", "index.html"],
    }),
    new ModuleFederationPlugin({
      name: "team_with_webpack",
      filename: "entry.js",
      library: { type: "module" },
      exposes: {
        "./WebpackComponent": "./src/WebpackComponent.tsx",
      },
      remotes: {
        team_with_originjs_vite_plugin_federation:
          "http://localhost:4173/assets/entry.js",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(mts|tsx|ts)$/i,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".mts", ".tsx", ".ts", ".mjs", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
