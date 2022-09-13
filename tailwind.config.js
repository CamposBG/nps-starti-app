/** @type {import('tailwindcss').Config} */
module.exports = {
  // ssr: false,
  content: [
    // "./components/**/*.{js,vue,ts}",
    // "./layouts/**/*.vue",
    // "./pages/**/*.vue",
    // "./plugins/**/*.{js,ts}",
    // // "./nuxt.config.{js,ts}",
    // "./app.vue",
    './components/**/*.{vue,js}',
    './components/**/**/*.{vue,js}',
    './components/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './pages/**/**/*.vue',
    './pages/**/**/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
