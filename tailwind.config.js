module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      brand: {
        100: '#F1F0FF',
        500: '#4737FF',
      },
      critical: { 500: '#E00033' },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
