const banner = require('./banner');
const config = require('../../tools/esbuild.config');

module.exports = {
  ...config,
  banner: {
    js: banner,
  },
};
