/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#203750',
          red: '#BF4039',
          gold: '#E4B153',
          cream: '#F5F2EB',
          offwhite: '#FFFDF8',
          charcoal: '#252521',
          gray: '#77766D',
          border: '#D9D4C8',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      }
    },
  },
  plugins: [],
}
