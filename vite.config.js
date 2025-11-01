import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import eslint from 'vite-plugin-eslint'

const TEMPLATE_PATH = 'wp-content/themes/TailBlade-WP'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      }
    }
  },
  plugins: [
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules']
    }),
    {
      handleHotUpdate({ file, server }) {
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
        replacement: process.env.NODE_ENV === 'development'
          ? resolve(__dirname, `${TEMPLATE_PATH}/src/`) : resolve(__dirname, 'src/')
      }
    ]
  },
  base: process.env.NODE_ENV === 'development' ? '/' : `/${TEMPLATE_PATH}/dist/`,
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname + '/src/scripts/main.ts')
      },
      output: {
        assetFileNames: assetInfo => {
          const extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|webp|bmp|ico/i.test(extType)) {
            return 'assets/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  server: {
    cors: {
      origin: '*'
    }
  }
})
