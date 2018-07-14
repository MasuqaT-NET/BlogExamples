const cheerio = require('cheerio');
const loaderUtils = require('loader-utils');
const postOrderProcess = require('./post-order-process');
const {postProcess} = require('./utils');

module.exports = function loader(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);

    source = source.replace(/\${/g, "\\${").replace(/`/g, "\\`");

    const $ = cheerio.load(source);

    postOrderProcess(this, $, options);

    const raw = $.html({xmlMode: true});
    return `module.exports = \`${postProcess(raw)}\``;
};