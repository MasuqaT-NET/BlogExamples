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
    source = source.replace(/{{bind\.attrs\.(\w+)}}/g, "${attrs.$1}");
    source = source.replace(/{{bind\.children}}/, "${children}");

    const $ = cheerio.load(source, {xmlMode: true});

    postOrderProcess(this, $, options);

    const raw = $.html({xmlMode: true});
    return `module.exports = (attrs, children) => \`${postProcess(raw)}\``;
};