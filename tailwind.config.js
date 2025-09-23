const {heroui} = require("@heroui/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        'twinkle': 'twinkle 3s linear infinite',
        'twinkle-slow': 'twinkle-slow 2s linear infinite',
        'twinkle-slower': 'twinkle-slower 4s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '0.3' },
        },
        'twinkle-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'twinkle-slower': {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.2' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}