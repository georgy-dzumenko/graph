import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/graph/',
    plugins: [react()],
    resolve: {
        alias: {
            '@theme': resolve('src/theme'),
            '@features': resolve('src/features'),
            '@utils': resolve('src/utils'),
            '@components': resolve('src/components'),
            '@assets': resolve('src/assets')
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    }
})
