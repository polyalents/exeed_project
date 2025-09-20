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
          dark: '#3e4651',
          gray: '#d2d6db',
          light: '#ffffff',
          black: '#1a1a1a',
          header: '#0e1214'
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Nunito-Sans', 'Arial', 'sans-serif'],
        heading: ['Tactic Sans', 'Nunito Sans', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}