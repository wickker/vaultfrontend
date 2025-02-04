import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, UserConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }: UserConfig) => {
  if (!mode) return {}

  const config = loadEnv(mode, process.cwd(), '')

  console.log(`🍀 Mode: ${mode}`)
  console.log(`🍀 Base URL: ${config.VITE_BASE_URL}`)

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
