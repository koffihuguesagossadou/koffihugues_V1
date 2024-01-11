import { defineConfig, loadEnv, splitVendorChunkPlugin  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.JSON_URL': JSON.stringify(env.JSON_URL)
    },
    plugins: [react(), splitVendorChunkPlugin()],
    build: { chunkSizeWarningLimit: 1600, }
  }
})