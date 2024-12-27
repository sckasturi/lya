import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Or specify your IP address (e.g., "192.168.1.100")
    port: 5173, // Or your desired port
  }
})
