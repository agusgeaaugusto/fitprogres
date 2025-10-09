import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GH Pages needs base set to repo name:
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  base: '/fitprogres/'
})
