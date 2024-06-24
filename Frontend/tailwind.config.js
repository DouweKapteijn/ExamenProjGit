/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'light-green': '#9EB25D',
        'green': '#99C66C',
        'medium-green': '#688744',
        'dark-green': '#315C2B',
        'orange': '#F08510',
        'dark-orange': '#DD571C',
      },   
    },
  },
  plugins: [],
}