import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load .env variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false
        },
        '/proxy': {
          target: 'https://dlnk.one',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, '')
        }
      }
    }
  }
})
