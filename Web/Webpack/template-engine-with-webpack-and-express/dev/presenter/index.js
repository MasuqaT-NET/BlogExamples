const page = require("../../src/page/index.html");

const data = require("../data/index.js");

let result;
try {
    result = page(data) +
        /* This is for reloading. */
        `<script src="index.js"></script>`;
}
catch (e) {
    result = `<html><body><pre>${e.stack}</pre><script src="index.js"></script></body></html>`;
}

module.exports = result;
