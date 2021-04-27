import { defineConfig } from 'vite'
import react from 'vite-preset-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  plugins: [react()],
})
