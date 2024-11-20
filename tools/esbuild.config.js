const inlineRawPlugin = require('./importRaw');
module.exports = {
  sourcemap: false,
  outExtension: {
    '.js': '.js',
  },
  plugins: [
    inlineRawPlugin({
      filter: /^css:/,
      namespace: 'css',
      transform: (content) => content
        .replace(/\s+/g, ' ')
        .replace(/([}{:;,]) /g, (all , char) => char)
        .replace(/ ([}{:;,])/g, (all , char) => char)
      ,
    }),
  ],
};
