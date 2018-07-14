const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonOptions = {
    prefixes: ['x-', 'y-'],
    paths: [path.resolve(__dirname, './src/components')],
    fileExt: '.html'
};

module.exports = {
    mode: "development",
    entry: {
        'index': path.resolve(__dirname, './src/pages/index.html')
    },
    output: {
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /src.pages.[\w-]+\.html$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "./dev/page-loader.js",
                            options: commonOptions
                        }
                    ]
                })
            },
            {
                test: /src.components.[\w-]+\.html$/,
                use: [
                    {
                        loader: "./dev/component-loader.js",
                        options: commonOptions
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].html"),
    ]
};
