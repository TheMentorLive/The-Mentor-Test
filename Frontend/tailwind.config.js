const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Just-in-Time compilation mode for faster development builds
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Content sources to scan for class names
  darkMode: 'media', // Use 'media' for dark mode based on user system settings
  theme: {
    extend: {
      // Custom breakpoints for responsiveness
      screens: {
        sm: '640px', // Small screens (e.g., mobile)
        md: '468px', // Medium screens (e.g., tablets)
        lg: '1024px', // Large screens (e.g., small desktops)
        xl: '1280px', // Extra large screens (e.g., large desktops)
        '2xl': '1536px', // 2x large screens
      },
      // Custom colors
      colors: {
        primary: '#2563EB',
        secondary: '#3B86F7',
        danger: '#e3342f',
      },
      // Set 'Inter' as the only font
      fontFamily: {
        sans: ['Inter'],
      },
      // Animation settings
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
  variants: {
    extend: {
      // Custom variants
    },
  },
  plugins: [
    // Plugin to hide scrollbars
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',               /* Webkit browsers */
        },
      }
      addUtilities(newUtilities)
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
