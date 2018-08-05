const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaCodeResolvePlugin = require('./dev/java-code-resolve-plugin');

module.exports = {
    mode: "development",
    entry: {
        'index': path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /tmp.jsweet.+\.ts$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ],
        plugins: [
            new JavaCodeResolvePlugin({targetRoot: path.resolve(__dirname, 'tmp/jsweet')})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};