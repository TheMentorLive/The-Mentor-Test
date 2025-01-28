const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  mode: 'jit', // Enable Just-In-Time mode for faster builds
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Specify the files Tailwind should scan
  darkMode: 'media', // Enable dark mode based on user preferences
  theme: {
    extend: {
      screens: {
        xs: '468px', // Extra small screens (custom)
        sm: '640px', // Small screens (mobile)
        md: '768px', // Medium screens (tablet)
        lg: '1024px', // Large screens (desktop)
        xl: '1280px', // Extra-large screens
        '2xl': '1536px', // 2x large screens
      },
      colors: {
        primary: '#2563EB',
        secondary: '#3B86F7',
        danger: '#e3342f',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE 10+ */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari */
        },
      };
      addUtilities(newUtilities);
    },
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
