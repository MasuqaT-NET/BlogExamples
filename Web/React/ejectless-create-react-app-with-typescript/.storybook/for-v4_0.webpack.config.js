const dev = require("react-scripts/config/webpack.config.dev");

// resolve .ejs error
dev.module.rules[dev.module.rules.length - 1].oneOf.forEach(e => {
  if (
    e.loader &&
    e.loader.includes("file-loader") &&
    Array.isArray(e.exclude)
  ) {
    e.exclude.push(/\.ejs$/);
  }
});

module.exports = {
  module: dev.module,
  resolve: dev.resolve
};
