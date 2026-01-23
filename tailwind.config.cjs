/** @type {import('tailwindcss').Config} */

// Generated design tokens from Figma (see scripts/build-tokens.js)
const tokens = require('./src/styles/tailwind-tokens.cjs');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: tokens.colors,
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    fontSize: tokens.fontSize,
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeight,
    // Utility-specific semantic colors for text-primary, bg-primary, border-primary
    textColor: ({ theme }) => ({
      ...theme('colors'),
      ...tokens.textColor,
    }),
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      ...tokens.backgroundColor,
    }),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      ...tokens.borderColor,
    }),
    extend: {
      // Container max widths from design system
      maxWidth: {
        'container-mobile': '100%',
        'container-desktop': '1280px',
      },
      // Width utilities from design system (generated)
      width: tokens.width,
      // Shadow tokens from Figma (Effects.tokens.json)
      boxShadow: {
        xs: '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        'xs-skeuomorphic': '0px 1px 2px 0px rgba(10, 13, 18, 0.05), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18)',
        sm: '0px 1px 2px -1px rgba(10, 13, 18, 0.1), 0px 1px 3px 0px rgba(10, 13, 18, 0.1)',
        md: '0px 2px 4px -2px rgba(10, 13, 18, 0.06), 0px 4px 6px -1px rgba(10, 13, 18, 0.1)',
        lg: '0px 2px 2px -1px rgba(10, 13, 18, 0.04), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 12px 16px -4px rgba(10, 13, 18, 0.08)',
        xl: '0px 3px 3px -1px rgba(10, 13, 18, 0.04), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 20px 24px -4px rgba(10, 13, 18, 0.08)',
        '2xl': '0px 4px 4px -2px rgba(10, 13, 18, 0.04), 0px 24px 48px -12px rgba(10, 13, 18, 0.18)',
        '3xl': '0px 5px 5px -2px rgba(10, 13, 18, 0.04), 0px 32px 64px -12px rgba(10, 13, 18, 0.14)',
        // Focus rings
        'focus-ring': '0px 0px 0px 4px rgb(158, 119, 237), 0px 0px 0px 2px rgb(255, 255, 255)',
        'focus-ring-xs': '0px 0px 0px 4px rgb(158, 119, 237), 0px 0px 0px 2px rgb(255, 255, 255), 0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        'focus-ring-xs-skeuomorphic': '0px 0px 0px 4px rgb(158, 119, 237), 0px 0px 0px 2px rgb(255, 255, 255), 0px 1px 2px 0px rgba(10, 13, 18, 0.05), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18)',
        'focus-ring-sm': '0px 0px 0px 4px rgb(158, 119, 237), 0px 0px 0px 2px rgb(255, 255, 255), 0px 1px 2px 0px rgba(10, 13, 18, 0.1), 0px 1px 3px 0px rgba(10, 13, 18, 0.1)',
        'focus-ring-error': '0px 0px 0px 4px rgb(240, 68, 56), 0px 0px 0px 2px rgb(255, 255, 255)',
        'focus-ring-error-xs': '0px 0px 0px 4px rgb(240, 68, 56), 0px 0px 0px 2px rgb(255, 255, 255), 0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        'focus-ring-error-xs-skeuomorphic': '0px 0px 0px 4px rgb(240, 68, 56), 0px 0px 0px 2px rgb(255, 255, 255), 0px 1px 2px 0px rgba(10, 13, 18, 0.05), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18)',
      },
      // Backdrop blur tokens from Figma
      backdropBlur: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
    },
  },
  plugins: [],
};
