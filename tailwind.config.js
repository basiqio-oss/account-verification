const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // BRAND COLOURS
      // To create your own palette from a brand colour, you can use a tool like https://www.tailwindshades.com/.
      primary: {
        DEFAULT: '#4737FF',
        50: '#F1F0FF', // subtle button bg,
        100: '#E8E5FF', // subtle button :hover bg,
        200: '#DEDBFF', // subtle button :active bg,
        300: '#9289FF',
        400: '#6D60FF',
        500: '#4737FF', // bold button bg, primary to accent bg gradient
        600: '#1400FE',
        700: '#1000C6',
        800: '#0B008E',
        900: '#070056',
        accent: '#9C4EFF', // primary to accent bg gradient
      },
      secondary: {
        DEFAULT: '#10EDC5',
        50: '#BAFAEF',
        100: '#A7F9EA',
        200: '#81F6E1',
        300: '#5BF4D8',
        400: '#34F1CF', // icons on dark bg
        500: '#10EDC5', // primary to secondary bg gradient
        600: '#0FD7B3', // icons on light bg
        700: '#0DBF9F',
        800: '#0BA78B',
        900: '#0A8F77',
      },

      // FUNCTIONAL COLOURS
      // Colours that are neutral and not necessarily tied to your products brand.
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000217',
      white: colors.white,
      gray: colors.blueGray, // text-gray-600 for muted text e.g.
      red: colors.red,
      green: colors.green,
    },

    // FONT
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [],
};
