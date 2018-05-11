const closureBuilder = require('closure-builder');
const glob = closureBuilder.globSupport();

closureBuilder.build({
  name: 'standard',
  srcs: glob([
    'src/js/*.js',
  ]),
  out: 'demo/bundle.js',
  out_source_map: 'demo/bundle.js.map',
  append: '//@ sourceMappingURL=bundle.js.map'
});