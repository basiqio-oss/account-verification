const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // THEME
    // To easily see what styles are used where, you can search the codebase for `text-primary-bold` e.g.
    // For more information on how to configure this TailwindCSS theme, go to https://tailwindcss.com/docs/theme

    colors: {
      // BRAND COLOURS
      // These are your product brand colours. Tweak these to get a branded experience out-of-the-box.

      // Primary brand colours
      primary: {
        // Subtle
        subtle: '#ecedf5', // <Button variant="subtle"/> bg, and radio options e.g.
        'subtle-darker': '#d8dbea', // <Button variant="subtle"/> :hover bg
        'subtle-darkest': '#c5c9e0', // <Button variant="subtle"/> :active bg

        // Bold
        bold: '#3D4C96', // <Button variant="bold"/> bg, and primary-bold -> primary-accent bg gradients e.g.
        'bold-darker': '#2A3466', // Links (darker to provide more contrast)

        // Accent
        accent: '#498EBE', // primary-bold to primary-accent bg gradient e.g.
      },

      // Secondary brand colours
      secondary: {
        // Bold
        'bold-lighter': '#F6C759', // icons on dark bg (lighter to provide more contrast)
        bold: '#EFBC50', // primary-bold to secondary-bold bg gradients e.g.
        'bold-darker': '#E5AE54', // icons on light bg (darker to provide more contrast)
      },

      // FUNCTIONAL COLOURS
      // Colours that are not necessarily tied to your products brand, but are heavily used to style the UI.

      // Base UI colours
      transparent: 'transparent',
      current: 'currentColor', // svgs to be able to grab the text-{color} as stroke- or fill colour
      black: '#4a4a4a', // default text colour
      white: '#FFFFFF', // default bg colour of the /account-verification flow, <Button variant="inverted"/> e.g.

      // Neutral UI colours
      neutral: {
        subtle: '#F5F8F9', // subtle backgrounds to contrast with default white bg e.g.
        'subtle-darker': '#EBEEEF', // <InstitutionsLoadingSkeleton />, disabled bg colour e.g.
        dim: '#DEE4E7', // border, divide colour
        'dim-darker': '#BECBD0', // form input border, radio circles e.g.
        muted: '#777f81', // muted icons, e.g. in <SearchInput />
        'muted-darker': '#6B7173', // muted text (darker to provide more contrast)
      },

      // Critical UI colours
      critical: {
        // Subtle
        subtle: '#FFE9EB', // ErrorMessage and critical Toast background e.g.

        // Bold
        bold: '#E8001C', // <Button variant="critical"/> bg, error border colour e.g.
        'bold-darker': '#A30014', // error message text colour (darker to provide more contrast)
      },

      // Success UI colours
      success: {
        // Subtle
        subtle: '#D6FFEB', // Success Toast background e.g.

        // Bold
        bold: '#00BD62', // Success Toast border and icon colour e.g.
      },
    },

    // FONT
    // Changing font makes a big difference to the branded experience of your product.
    // To change font go to /styles.css and import the font you want.
    // Font-weights used through-out this example app are:
    // 400 (default), 500 (font-medium), and 600 (font-semibold).
    fontFamily: {
      sans: ['Lato', ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: 400,
      medium: 700,
      semibold: 900,
    },

    extend: {
      animation: {
        'ping-slow': 'pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pingSlow: {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
