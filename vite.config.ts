import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Unocss from 'unocss/vite'
import { presetWind } from 'unocss'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    Unocss({
      presets: [presetWind()],
    }),
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: { sourcemap: true },
    }),
  ],
})
