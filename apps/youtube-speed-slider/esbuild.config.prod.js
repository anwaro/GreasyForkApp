const banner = require('./banner');

module.exports = {
  sourcemap: false,
  outExtension: {
    '.js': '.js',
  },
  banner: {
    js: banner,
  },
};
