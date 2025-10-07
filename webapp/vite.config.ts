import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // IMPORTANTE: Base para GitHub Pages (nombre del repo)
  base: '/fitprogres/'
})
