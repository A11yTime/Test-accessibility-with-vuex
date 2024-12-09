import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // <-- Add this import

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true, // To use Jest-like global functions such as `describe`, `it`, `expect`
        environment: 'jsdom', // Set the environment to jsdom for DOM manipulation
        setupFiles: './test/setup.js', // Path to setup file, if needed
        maxConcurrency: 5, // ran parallel test
        alias: {
            '@': resolve(__dirname, 'src'), // Now `resolve` is correctly imported
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // The target server to proxy to
                changeOrigin: true, // Change the origin of the request to the target's origin
                rewrite: (path) => path.replace(/^\/api/, '') // Optionally rewrite the path (remove /api prefix)
            },
            // Additional proxy rules can go here
        }
    }
});