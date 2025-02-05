import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, UserConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }: UserConfig) => {
  if (!mode) return {}

  const config = loadEnv(mode, process.cwd(), '')

  console.log(`🍀 Mode: ${mode}`)
  console.log(`🍀 Base URL: ${config.VITE_BASE_URL}`)

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'Vault',
          short_name: 'Vault',
          description: 'Simple password manager',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'logo-x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'logo-x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
