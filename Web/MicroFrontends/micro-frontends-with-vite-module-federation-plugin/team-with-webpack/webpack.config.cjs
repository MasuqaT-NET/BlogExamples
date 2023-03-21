const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/main.mjs',
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
      new HtmlWebpackPlugin({
          title: "aaa",
          template: 'index.html',
      }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(html|svelte)$/,
                use: 'svelte-loader',
                include: [
                  path.resolve(__dirname, 'src')
                ]
            },
        ],
    },
    resolve: {
        alias: {
          svelte: path.dirname(require.resolve('svelte/package.json'))
        },
        extensions: ['.mjs', '.js', '.svelte'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
