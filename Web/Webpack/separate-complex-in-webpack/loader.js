const qs = require('querystring');
const loaderUtils = require('loader-utils');

const cache = {};

const scriptRegex = /(<script[^<>]*>)([^<>]+)<\/script>/;
const styleRegex = /(<style[^<>]*>)([^<>]+)<\/style>/;

module.exports = function loader(source) {
  this.cacheable();
  const callback = this.async();
  const query = qs.parse(this.resourceQuery.slice(1));
  const options = loaderUtils.getOptions(this) || {};

  const keyInHash = Object.keys(cache).find(x => x === this.resourcePath + "-" + loaderUtils.getHashDigest(source));
  if (typeof query["marker"] !== "undefined") {
    if (keyInHash) {
      if (typeof query.type === "undefined") {
        callback("Invalid sub-request!");
        return;
      }
      if (query.type === "js") {
        callback(null, cache[keyInHash].bundle);
        return;
      }
      if (query.type === "html") {
        callback(null, cache[keyInHash].body);
        return;
      }
      if (query.type === "css") {
        callback(null, cache[keyInHash].style);
        return;
      }
      callback("Invalid type!");
      return;
    }
    callback("Cache unavailable!");
    return;
  }

  if (keyInHash) { // cache exists
    callback(null, cache[keyInHash].requests);
    return;
  }

  const originalSource = source;
  const scriptMatch = scriptRegex.exec(source);
  let bundle = '';
  const jsName = loaderUtils.interpolateName(this, "[name].js", {context: this.rootContext});
  if (scriptMatch) {
    bundle = scriptMatch[2];
    const buf = source.split(scriptMatch[0]);
    source = `${buf[0]} ${`<script src="${jsName}"></script>`} ${buf[1]}`;
  }

  const styleMatch = styleRegex.exec(source);
  let style = '';
  const cssName = loaderUtils.interpolateName(this, "[name].css", {context: this.rootContext});
  if (scriptMatch) {
    style = styleMatch[2];
    const buf = source.split(styleMatch[0]);
    source = `${buf[0]} ${`<link rel="stylesheet" href="${cssName}"/>`} ${buf[1]}`;
  }

  const body = source;

  const jsReq = loaderUtils.stringifyRequest(this, this.resourcePath + `?marker=${options.marker}&type=js`);
  const htmlReq = loaderUtils.stringifyRequest(this, this.resourcePath + `?marker=${options.marker}&type=html`);
  const cssReq = loaderUtils.stringifyRequest(this, this.resourcePath + `?marker=${options.marker}&type=css`);
  const requests = `import ${jsReq}; import ${htmlReq}; import ${cssReq};`; // no exports

  cache[this.resourcePath + "-" + loaderUtils.getHashDigest(originalSource)] = {
    bundle,
    style,
    body,
    requests
  };

  callback(null, requests);
};