import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    strategies: 'generateSW', // ya 'injectManifest', jo aap use kar rahe hain
      workbox: {
        // Purani caches ko cleanup karne ke liye
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              // Yahan cache name mein version update kar sakte hain
              cacheName: 'my-app-images-v2',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },

    registerType: 'autoUpdate', // Service Worker ko auto update karne ke liye
    includeAssets:['kaaba.png',
      'logo.png'],

    manifest: {
      name: 'ابوبکر روحانی ویلفیرٹرسٹ',  // Full app name
      short_name: 'روحانی',              // Short name for home screen
      description: 'یہ ایک Progressive Web App ہے jo Urdu mein bana hai.', // Description
      theme_color: '#ffffff',            // Theme color for browser UI
      background_color: '#ffffff',       // Background color on launch
      start_url: '/',                    // Start URL when launched
      display: 'standalone',             // Display mode
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/logo2.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '.png',
          sizes: '192x192',
          type: 'image/png'
        }
        // Agar aapke paas additional icon sizes hain, unko yahan add karein
      ]
    }
  })

  ],

})
