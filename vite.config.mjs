import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig, normalizePath } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const LIBRARY_NAME = 'ui-kioskinput'

export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(resolve(__dirname, `./ui/dist/${LIBRARY_NAME}.umd.js`)),
                    dest: normalizePath(resolve(__dirname, 'resources'))
                },
                {
                    src: normalizePath(resolve(__dirname, './vendor/kioskboard-aio-2.3.0.min.js')),
                    dest: normalizePath(resolve(__dirname, 'resources/vendor'))
                }
            ]
        })
    ],
    build: {
        sourcemap: process.env.NODE_ENV === 'development',
        lib: {
            entry: resolve(__dirname, 'ui/index.js'),
            name: LIBRARY_NAME,
            formats: ['umd'],
            fileName: (format, entryName) => `${LIBRARY_NAME}.${format}.js`
        },
        outDir: './ui/dist',
        emptyOutDir: false,
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
