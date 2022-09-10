import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  components: {
    global: true,
    dirs: ['~/components'],
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
