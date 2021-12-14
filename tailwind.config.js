const colors = require('tailwindcss/colors');

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
        500: '#4737FF', // bold button bg
        600: '#1400FE',
        700: '#1000C6',
        800: '#0B008E',
        900: '#070056',
      },
      secondary: '#0DE2BC', // primary bg gradients
      accent: '#9C4EFF', // accent bg gradients, icons

      // FUNCTIONAL COLOURS
      // Colours that are neutral and not necessarily tied to your products brand.
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000217',
      white: colors.white,
      gray: colors.blueGray,
      red: colors.red,
      green: colors.green,
    },

    // TYPEFACE FONT
    // TODO
    fontFamily: {
      sans: ['Inter var', 'sans-serif', 'ui-sans-serif', 'system-ui'],
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
