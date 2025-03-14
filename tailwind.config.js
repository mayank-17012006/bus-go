/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F8FFE5',
        secondary: '#06D6A0',
        background: '#F8F9FA',
      },
    },
  },
  plugins: [],
};