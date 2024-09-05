module.exports = {
  mode: 'jit', // Just-in-Time compilation mode for faster development builds
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Content sources to scan for class names
  darkMode: 'media', // Use 'media' for dark mode based on user system settings
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        // Set 'Inter' as the only font
        sans: ['Inter'], // Only 'Inter' for sans font
      },
    },
  },
  variants: {
    extend: {
      // Custom variants
    },
  },
  plugins: [
    // Additional plugins
  ],
};




