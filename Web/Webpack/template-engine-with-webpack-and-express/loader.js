const loaderUtils = require('loader-utils');

const IDENTIFIER = '$_$';

module.exports = function loader(source) {
    const newSource = source.replace(/\${(.+?)}/g, "$${guard(`$1`," + IDENTIFIER + ".$1)}");
    return `const guard = require(${loaderUtils.stringifyRequest(this, require.resolve("./guard.js"))});
    module.exports = (${IDENTIFIER}) => \`${newSource}\`;`;
};