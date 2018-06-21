const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const chokidar = require('chokidar');
const WebSocket = require('ws');

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');


module.exports = {
    mode: "development",
    entry: {
        "index": path.resolve(__dirname, "dev/presenter/index.js"),
        "detail": [path.resolve(__dirname, "dev/presenter/detail.js"), require.resolve("webpack-hot-client/client")]
        // webpack-hot-client/client is temporary necessary
    },
    output: {
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /page.\w+\.html/,
                use: [
                    {
                        loader: "./loader.js"
                    }
                ]
            },
            {
                test: /dev.presenter.\w+\.js/,
                use: ExtractTextPlugin.extract({
                    use: "noop-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].html"),
    ]
};

module.exports.serve = {
    content: [__dirname],
    port: 8080,
    hot: {
        host: "localhost",
        port: 8090,
        allEntries: true
    },
    on: {
        // To reload after src or dev data is modified
        listening(server) {
            const socket = new WebSocket("ws://localhost:8090");
            const watchPath = ["src", "dev"];
            const options = {};
            const watcher = chokidar.watch(watchPath, options);

            watcher.on('change', () => {
                const data = {
                    type: 'broadcast',
                    data: {
                        type: 'window-reload',
                        data: {},
                    },
                };

                socket.send(JSON.stringify(data));
            });

            socket.on('close', () => {
                watcher.close();
            });
        },
    },
    add: (app, middleware, options) => {
        app.use(convert(history({
            rewrites: [
                {
                    from: /^\/([^\\/.]+)$/, to: (context) => "/" + context.match[1] + ".html"
                }
            ]
        })));
    },
};
