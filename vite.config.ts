import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import gzipPlugin from 'rollup-plugin-gzip';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_APP_TITLE } = loadEnv(mode, process.cwd());

  return defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
    ],
    build: {
      rollupOptions: {
        plugins: [gzipPlugin()],
        output: {
          manualChunks(id) {
            const result = /[\\/]node_modules[\\/](.*?)([\\/]|$)/.exec(id);
            if (result) {
              const [, packageName] = result;
              return `npm.${packageName.replace('@', '')}`;
            }
            return 'others';
          },
        },
      },
    },
  });
};
