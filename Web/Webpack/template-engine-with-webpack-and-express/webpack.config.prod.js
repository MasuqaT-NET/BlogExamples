const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        "index": path.resolve(__dirname, "src/page/index.html"),
        "detail": path.resolve(__dirname, "src/page/detail.html")
    },
    output: {
        path: path.resolve(__dirname, "public"),
        libraryTarget: "umd"
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
            }
        ]
    },
    target: "node"
};
