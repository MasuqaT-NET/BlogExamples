const glob = require('glob');
const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function (loaderContext, options) {
    const roots = Array.isArray(options.paths) ? options.paths : [options.paths];
    let filePath = null;
    for (const root of roots) {
        const files = glob.sync(path.join(root, '**', options.name + options.fileExt));
        if (files.length === 1) {
            filePath = files[0];
            break;
        } else if (files.length > 1) {
            loaderContext.callback(`Component "${options.name}" duplicated`);
            return "";
        }
    }
    if (filePath === null) {
        loaderContext.callback(`Component "${options.name}" not found`);
        return "";
    }
    return loaderUtils.stringifyRequest(loaderContext, require.resolve(filePath));
};
