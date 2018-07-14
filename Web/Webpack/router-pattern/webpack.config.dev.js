const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        'index': path.resolve(__dirname, './src/pages/index.html')
    },
    module: {
        rules: [
            {
                test: /src.pages.[\w-]+\.html$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "./dev/loader.js",
                            options: {
                                prefixes: ['x-'],
                                paths: [path.resolve(__dirname, './src/components')],
                                fileExt: '.html'
                            }
                        }
                    ]
                })
            },
            {
                test: /src.components.[\w-]+\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].html"),
    ]
};
