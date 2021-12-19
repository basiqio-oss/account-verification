const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // BRAND COLOURS
      // These are your product brand colours. Tweak these to get a branded experience out-of-the-box.
      // To create your own palette from a brand colour, you can use a tool like https://www.tailwindshades.com/.
      primary: {
        subtle: '#F1F0FF', // Used for subtle button bg,
        subtledarker: '#E8E5FF', // Used for subtle button :hover bg,
        subtledarkest: '#DEDBFF', // Used for subtle button :active bg,
        // 300: '#9289FF',
        // 400: '#6D60FF',
        bold: '#4737FF', // Used for bold button bg, primary to accent bg gradient
        // 600: '#1400FE',
        // 700: '#1000C6',
        // 800: '#0B008E',
        // 900: '#070056',
        accent: '#9C4EFF', // Used for primary to accent bg gradient
      },
      secondary: {
        // 50: '#BAFAEF',
        // 100: '#A7F9EA',
        // 200: '#81F6E1',
        // 300: '#5BF4D8',
        boldlighter: '#34F1CF', // Used for icons on dark bg
        bold: '#10EDC5', // Used for primary to secondary bg gradient
        bolddarker: '#0FD7B3', // Used for icons on light bg
        // 700: '#0DBF9F',
        // 800: '#0BA78B',
        // 900: '#0A8F77',
      },

      // FUNCTIONAL COLOURS
      // Colours that are neutral and not necessarily tied to your products brand.
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000217',
      white: colors.white,
      gray: colors.blueGray, // text-gray-600 for muted text e.g.
      red: colors.red, // use for critical intent, errors e.g.
    },

    // FONT
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
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
