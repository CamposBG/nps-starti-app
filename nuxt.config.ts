import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  components: {
    global: true,
    dirs: ['~/components'],
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3333/ ',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      hmr: true,
    },
  },

  css:['@/assets/css/tailwind.scss',],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: [
    { ssr: false, src: '~/plugins/providers' }
  ],
})
