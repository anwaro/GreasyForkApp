const path = require('path');
const fs = require('fs').promises;

module.exports = (options) => {
  const { filter, namespace, transform } = Object.assign(
    {
      filter: /^raw:/,
      namespace: '_' + Math.random().toString(36).substr(2, 9),
      transform: async (contents, args) => contents,
    },
    options
  );

  return {
    name: 'esbuild-raw-plugin',
    setup(build) {
      let alias = Object.entries(
        build.initialOptions.alias ?? {
          [process.env.PWD]: '',
        }
      );
      build.onResolve({ filter }, async (args) => {
        let inputPath = alias.reduce((path, [key, val]) => {
          return path.replace(key, val);
        }, args.path);

        let filePath = path.resolve(args.resolveDir, inputPath);
        try {
          await fs.access(filePath);
        } catch {
          filePath = path.resolve(
            args.resolveDir,
            inputPath.replace(filter, '')
          );
        }

        return {
          path: filePath.replace(`${process.env.PWD}/`, ''),
          namespace,
        };
      });

      build.onLoad({ filter: /.*/, namespace }, async (args) => {
        let contents = await fs.readFile(args.path, 'utf8');

        if (typeof transform === 'function') {
          contents = await transform(contents, args);
        }

        return {
          contents,
          watchFiles: [args.path],
          loader: 'text',
        };
      });
    },
  };
};
