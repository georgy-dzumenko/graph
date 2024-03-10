import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@theme': resolve('src/theme'),
            '@components': resolve('src/components'),
            '@assets': resolve('src/assets')
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    }
})
