/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#7282ff',
          100: '#5158ff',
          200: '#3a32f9',
          300: '#3026dc',
          400: '#2c25c4',
          500: '#25248b',
          600: '#181551',
        },
        'secondary': {
          50: '#d17aff',
          100: '#c048ff',
          200: '#b024f9',
          300: '#9914dc',
          400: '#8c18c3',
          500: '#691390',
          600: '#4a006c',
        }
      }
    },
  },
  plugins: [],
}

