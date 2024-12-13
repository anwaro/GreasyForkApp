import { readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import prettier from 'prettier';
import { minify } from 'terser';

import { banner } from './banner';

export const isDev = (mode: string) => mode === 'development';

export const greasyFork = (isDev: boolean) => ({
  name: 'create-script',

  transform(code, url) {
    if (url.includes('modulepreload-polyfill.js')) {
      return '';
    }
    if (url.endsWith('ts') || url.endsWith('tsx')) {
      const fakeCode = `window.filePath${Math.random()
        .toString()
        .replace('.', '')} = "${url}"`;
      return `${fakeCode}\n${code}`;
    }
  },

  async writeBundle(options) {
    const functionName = 'importPreact';
    const remove = (file: string) => rmSync(resolve(options.dir, file));
    const read = (file: string) =>
      readFileSync(resolve(options.dir, file), {
        encoding: 'utf-8',
      });

    const write = (file: string, data: string) =>
      writeFileSync(resolve(options.dir, file), data, {
        encoding: 'utf-8',
      });

    const createFunction = (code: string) => {
      const swapAlias = (props: string) =>
        props.replace(
          / ([^ ]+) as ([^ ,\n]+)/g,
          (_, name, alias) => `${alias}: ${name}`
        );

      const codeWithReturn = code.replace(
        /export (\{[^}]+};)/,
        (_, code) => `return ${swapAlias(code)}`
      );
      return `function ${functionName}(){${codeWithReturn}}`;
    };

    const formatAppCode = (code: string) => {
      code = code
        .replace(/\/\*[^*]+\*\//g, '')
        .replace(
          /window\.filePath[^"']+["']([^"']+).+/g,
          (_, path) => `\n// ${path.replace(`${process.env.PWD}/`, '')}`
        );

      return prettier.format(code, {
        parser: 'babel',
        singleQuote: true,
      });
    };

    const createAppCode = async (code: string, vendorCode: string) => {
      const splitter = '----SPLITTER----';
      const [viteCode, appCode] = code
        .replace(
          /import ({.+})[^;]+;/,
          (_, props) => `${splitter}const ${props} = ${functionName}();`
        )
        .split(splitter);
      const vendor = await minify(createFunction(vendorCode));
      const vite = await minify(viteCode);
      return [
        isDev ? '' : banner,
        '// Libs: preact, preact/hooks',
        vendor.code,
        // createFunction(vendorCode),
        '// Vite helpers',
        vite.code,
        '\n// App code',
        formatAppCode(appCode),
      ].join('\n');
    };

    const vendorCode = read(options.chunkFileNames);
    const appCode = read(options.entryFileNames);
    write(options.entryFileNames, await createAppCode(appCode, vendorCode));
    remove(options.chunkFileNames);
    remove('index.html');
  },
});
