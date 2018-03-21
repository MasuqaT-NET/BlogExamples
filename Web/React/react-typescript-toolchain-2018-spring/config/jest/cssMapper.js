module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        return false;
      }
      // lowerCamelCase to kebab-case
      return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }
);
