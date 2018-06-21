const page = require("../../src/page/detail.html");

const data = require("../data/detail.js");

let result;
try {
    result = page(data) +
        /* This is for reloading. */
        `<script src="detail.js"></script>`;
}
catch (e) {
    result = `<html><body><pre>${e.stack}</pre><script src="detail.js"></script></body></html>`;
}

module.exports = result;
