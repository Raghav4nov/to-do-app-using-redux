import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/to-do-app-using-redux/', 
  plugins: [
    tailwindcss(),
  ],
})
