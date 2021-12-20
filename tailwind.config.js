const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // THEME
    // To easily see what styles are used where, you can search the codebase for "text-primary-bold" e.g.
    // For more information on how to configure this TailwindCSS theme, go to https://v2.tailwindcss.com/docs/theme

    colors: {
      // BRAND COLOURS
      // These are your product brand colours. Tweak these to get a branded experience out-of-the-box.

      // Primary brand colours
      primary: {
        // Subtle
        subtle: '#F1F0FF', // Used for <Button variant="subtle"/> bg, and radio options e.g.
        subtledarker: '#E8E5FF', // Used for <Button variant="subtle"/> :hover bg
        subtledarkest: '#DEDBFF', // Used for <Button variant="subtle"/> :active bg

        // Bold
        bold: '#4737FF', // Used for <Button variant="bold"/> bg, and primary-bold -> primary-accent bg gradients e.g.
        bolddarker: '#1400FE', // Used for links (darker to provide more contrast)

        // Accent
        accent: '#9C4EFF', // Used for primary-bold to primary-accent" bg gradient e.g.
      },

      // Secondary brand colours
      secondary: {
        // Bold
        boldlighter: '#34F1CF', // Used for icons on dark bg (lighter to provide more contrast)
        bold: '#10EDC5', // Used for primary-bold to secondary-bold bg gradients e.g.
        bolddarker: '#0FD7B3', // Used for icons on light bg (darker to provide more contrast)
      },

      // FUNCTIONAL COLOURS
      // Colours that are not necessarily tied to your products brand, but are heavily used to style the UI.

      // Base UI colours
      transparent: 'transparent',
      current: 'currentColor', // Used for svgs to be able to grab the text-{color} as stroke- or fill colour
      black: '#000217', // Used for default text colour
      white: '#FFFFFF', // Used for default bg colour of the /account-verification flow, <Button variant="inverted"/> e.g.

      // Neutral UI colours
      neutral: {
        subtle: '#F5F8F9', // Used for subtle backgrounds to contrast with default white bg e.g.
        subtledarker: '#EBEEEF', // Used for <InstitutionsLoadingSkeleton />, disabled bg colour e.g.
        dim: '#DDE2E4', // User for default border colour
        dimdarker: '#BECBD0', // Used for input border, radio circles e.g.
        muted: '#7E888E', // Used for muted icons, e.g. in <SearchInput />
        muteddarker: '#4F6772', // Used for muted text (darker to provide more contrast)
      },

      // Critical UI colours
      critical: {
        // subtle
        subtle: '#FFE9EB', // Used for error message backgrounds e.g.

        // bold
        bold: '#E8001C', // Used for <Button variant="critical"/> bg, error border colour e.g.
        bolddarker: '#CB0018', // Used for error message text colour (darker to provide more contrast)
      },
    },

    // FONT
    // Changing font makes a big difference to the branded experience of your product.
    // To change font go to /styles.css and import the font you want.
    // Font-weights used through-out this example app are:
    // 400 (default), 500 (font-medium), and 600 (font-semibold).
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {
      // Extending ring-{colour} variants to support :hover and :active styles
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [],
};
