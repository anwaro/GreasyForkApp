/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

import { greasyFork, isDev } from './vite.build';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      minify: false,
      reportCompressedSize: true,
      rollupOptions: {
        external: isDev(mode) ? [] : [/^preact\/.*/, 'preact'],
        output: {
          entryFileNames: isDev(mode) ? 'dev.js' : 'main.js',
        },
      },
      terserOptions: {
        compress: false,
        mangle: false,
      },
    },
    cacheDir: '../../node_modules/.vite/gitlab-plus',
    plugins: [preact(), nxViteTsPaths(), greasyFork(isDev(mode))],
    root: __dirname,
  };
});
