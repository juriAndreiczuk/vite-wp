import { defineConfig } from 'vite'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

const TEMPLATE_PATH = 'wp-content/themes/vite-wp'

export default defineConfig({
  plugins: [
    eslint(),
    {
      handleHotUpdate({ file, server  }) {
        if (file.endsWith('.php')) {
          server.ws.send({
            type: 'full-reload',
            path: '*'
          })
        }
      }
    }
  ],
  resolve: {
    alias: [
      {
        find: '@/src',
        replacement: process.env.NODE_ENV === 'development' ?
          resolve(__dirname, `${TEMPLATE_PATH}/src/`) : resolve(__dirname, 'src/')
      }
    ]
  },
  base: process.env.NODE_ENV === 'development' ? '/' : `/${TEMPLATE_PATH}/dist/`,
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname + '/src/scripts/app.js')
      },
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|webp|bmp|ico/i.test(extType)) {
            return `assets/[name][extname]`
          } else {
            return `assets/[name]-[hash][extname]`
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  server: {
    cors: {
      origin: "*"
    }
  }
})