import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            // Without these the legal pages are left out of dist/.
            input: {
                main: 'index.html',
                impressum: 'impressum.html',
                datenschutz: 'datenschutz.html',
            },
        },
    },
})
