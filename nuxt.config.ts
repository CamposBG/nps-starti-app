import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  components: {
    global: true,
    dirs: ["~/components"],
  },

  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost/api/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      hmr: true,
    },
    build: {
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            chart: ['vue3-echarts'],
          },
        },
      },
    },
    // plugins: [
    //   eslintPlugin()
    // ]
  },

  css: ["@/assets/css/tailwind.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  plugins: [{ ssr: false, src: "~/plugins/providers" }],
});
