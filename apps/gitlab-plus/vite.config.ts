/// <reference types='vitest' />
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { greasyFork, isDev } from './vite.build';

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/gitlab-plus',
    plugins: [preact(), nxViteTsPaths(), greasyFork(isDev(mode))],
    build: {
      emptyOutDir: false,
      reportCompressedSize: true,
      minify: false,
      terserOptions: {
        compress: false,
        mangle: false,
      },
      rollupOptions: {
        output: {
          entryFileNames: isDev(mode) ? 'dev.js' : 'main.js',
          chunkFileNames: isDev(mode) ? 'vendor-dev.js' : 'vendor.js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
