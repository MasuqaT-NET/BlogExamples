const cheerio = require('cheerio');
const loaderUtils = require('loader-utils');
const componentRouter = require('./component-router');

module.exports = function loader(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);

    source = source.replace(/\${/g, "\\${").replace(/`/g, "\\`");

    const $ = cheerio.load(source);

    const context = this;
    for (const prefix of options.prefixes) {
        $("*").filter(function () {
            return this.name.startsWith(prefix);
        }).each(function () {
            const componentName = this.name;
            const passingOptions = {'name': componentName, ...options};

            const request = componentRouter(context, passingOptions);

            $(this).before(`\${require(\`${request.slice(1, -1)}\`)}`);
            $(this).remove();
        });
    }
    return `module.exports = \`${$.html()}\``;
};