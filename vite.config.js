import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/src/Projects/Weather/weather/dist/',
  plugins: [react()],
})
