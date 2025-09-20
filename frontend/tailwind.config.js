/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'exeed': {
          blue: '#003d82',
          gray: '#6b7280',
          dark: '#111827',
          light: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Nunito-Sans', 'Arial', 'sans-serif'], // для обычного текста
        heading: ['Tactic Sans', 'Nunito Sans', 'Arial', 'sans-serif'], // для заголовков
      }
    },
  },
  plugins: [],
}