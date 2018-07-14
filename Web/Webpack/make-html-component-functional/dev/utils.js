module.exports.postProcess = function (str) {
    return str.replace(/!#!#/g, '"');
};

module.exports.stringifyForStringInterpolation = function (obj) {
    const baseStr = JSON.stringify(obj);
    return baseStr.replace(/"/g, '!#!#');
};
