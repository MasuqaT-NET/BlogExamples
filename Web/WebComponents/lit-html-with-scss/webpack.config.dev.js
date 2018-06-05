const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        "index": path.resolve("src/page/index.scss"),
        "scss-button": path.resolve("src/components/scss-button.js"),
    },
    output: {
        path: path.resolve("public")
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.scss$/,
                rules: [
                    {
                        oneOf: [
                            {
                                // For component's style
                                test: /src.components/,
                                loader: "raw-loader" // Simple
                                // use: [ // Minimize
                                //     {
                                //         loader: "to-string-loader"
                                //     },
                                //     {
                                //         loader: "css-loader",
                                //         options: {
                                //             minimize: true,
                                //             importLoaders: 1
                                //         }
                                //     }
                                // ]
                            },
                            {
                                // For page & common style
                                loader: "file-loader",
                                options: {
                                    name: "[name].css"
                                }
                            },
                        ]
                    },
                    {
                        loader: "sass-loader"
                    }
                ],
            }
        ]
    },
    devServer: {
        contentBase: path.resolve("public")
    }
};