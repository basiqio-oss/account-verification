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
        // subtle
        subtle: '#F1F0FF', // Used for subtle button bg, radio options
        subtledarker: '#E8E5FF', // Used for subtle :hover bg
        subtledarkest: '#DEDBFF', // Used for subtle :active bg

        // bold
        bold: '#4737FF', // Used for bold button bg, primary to accent bg gradient
        bolddarker: '#1400FE', // Used for links (more contrast on light bg)

        // accent
        accent: '#9C4EFF', // Used for primary to accent bg gradient
      },
      secondary: {
        // bold
        boldlighter: '#34F1CF', // Used for icons on dark bg
        bold: '#10EDC5', // Used for primary to secondary bg gradient
        bolddarker: '#0FD7B3', // Used for icons on light bg
      },

      // FUNCTIONAL COLOURS
      // Colours that are neutral and not necessarily tied to your products brand.
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000217', // Used for default text colour
      white: '#FFFFFF', // Used for default bg colour of the app
      gray: colors.blueGray, // text-gray-600 for muted text e.g.
      red: colors.red, // use for critical intent, errors e.g.
    },

    // FONT
    // Changing font makes a big difference to the branded experience of your product.
    // To change font go to /styles.css and import the font you want.
    // Font-weights used through-out this app are
    // 400 (default), 500 (font-medium), and 600 (font-semibold).
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {
      // Extending to support ring- styles for hover and active
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [],
};
