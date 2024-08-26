// tailwind.config.js

module.exports = {
  mode: 'jit', // Just-in-Time compilation mode for faster development builds
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Purge unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Add custom colors here
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        // Add custom fonts here
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'monospace'],
       " dancing-script": ['Dancing Script', 'cursive']
      },
      // Add more theme customizations as needed
    },
  },
  variants: {
    extend: {
      // Add custom variants here
    },
  },
  plugins: [
    // Add additional plugins here
  ],
};
