// tailwind.config.js

module.exports = {
  mode: 'jit', // Just-in-Time compilation mode for faster development builds
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Content sources to scan for class names
  darkMode: 'media', // Use 'media' to enable dark mode based on user system settings, or remove this line if you prefer default behavior
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
        'dancing-script': ['Dancing Script', 'cursive']
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
