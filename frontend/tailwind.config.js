/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exeed: {
          dark: '#3e4651',
          gray: '#d2d6db',
          light: '#ffffff',
          black: '#1a1a1a',
          header: '#0e1214',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'Nunito-Sans', 'Arial', 'sans-serif'],
        heading: ['"Tactic Sans"', '"Nunito Sans"', 'Arial', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '18': '4.5rem',
      },
      fontSize: {
        'xxs': '0.6875rem',
        'tiny': '0.75rem',
      },
      height: {
        'model-mobile': '400px',
        'model-desktop': '800px',
        'model-card': '400px',
        'model-card-lg': '800px',
      },
      // ИСПРАВЛЕННЫЕ брейкпоинты - НЕ переопределяем стандартные!
      screens: {
        'tablet-vert': '810px', // Только добавляем новые
        'desktop-sm': '1460px',
        'desktop': '1690px',
        'desktop-xl': '1920px',
        // НЕ переопределяем: sm, md, lg, xl, 2xl
      },
    },
  },
  plugins: [],
};