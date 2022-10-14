/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './screens/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      zIndex: {
        '-10': '-10',
        '-1': '-1',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: {
          DEFAULT: colors.white,
        },
      },
      fontSize: {
        '5.5xl': ['3.5rem', '1'],
      },
      transitionProperty: {
        dimension: 'height, width',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
