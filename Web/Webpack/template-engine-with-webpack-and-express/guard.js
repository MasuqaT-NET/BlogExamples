module.exports = function guard(name, obj) {
    if (typeof obj === 'undefined') {
        throw new Error(`${name} is undefined.`);
    }
    if (typeof obj === 'object') {
        throw new Error(`${name} is object or array.`);
    }
    if (typeof obj === 'function') {
        throw new Error(`${name} is function.`);
    }
    return obj.toString();
};
