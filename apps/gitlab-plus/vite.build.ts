import { readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';

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
        .replace('.', '')} = "${url.replace(`${process.env.PWD}/`, '')}"`;
      return `${fakeCode}\n${code}`;
    }
  },

  async writeBundle(options) {
    const remove = (file: string) => rmSync(resolve(options.dir, file));
    const read = (file: string) =>
      readFileSync(resolve(options.dir, file), {
        encoding: 'utf-8',
      });

    const write = (file: string, data: string) =>
      writeFileSync(resolve(options.dir, file), data, {
        encoding: 'utf-8',
      });

    const nameToObj = (name: string) => {
      const map = {
        preact: 'preact',
        'preact/hooks': 'preactHooks',
        'preact/jsx-runtime': 'jsxRuntime',
      };
      const obj = map[name];
      return obj ? `this.${obj}` : 'this';
    };

    const createAppCode = (code: string) => {
      if (!isDev) {
        code = [isDev ? '' : banner, '// Vite helpers', code].join('\n');
        code = code
          .replace('import', '\n// App code \nimport')
          .replace(
            /import ({.+}) from "(.+)";/g,
            (_, props, lib) => `const ${props} = ${nameToObj(lib)};`
          )
          .replace(/\/\*[^*]+\*\//g, '');
      }

      return code.replace(
        /window\.filePath[^"']+["']([^"']+).+/g,
        (_, path) => `\n// ${path}`
      );
    };

    const appCode = read(options.entryFileNames);
    write(options.entryFileNames, createAppCode(appCode));
    remove('index.html');
  },
});
