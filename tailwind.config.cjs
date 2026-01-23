/** @type {import('tailwindcss').Config} */

// Generated design tokens from Figma
const tokens = require('./src/styles/tailwind-tokens.cjs');

// Manual typography tokens (not yet exported from Figma)
const fontSize = {
  xs: ['12px', { lineHeight: '18px' }],
  sm: ['14px', { lineHeight: '20px' }],
  md: ['16px', { lineHeight: '24px' }],
  lg: ['18px', { lineHeight: '28px' }],
  xl: ['20px', { lineHeight: '30px' }],
  'display-xs': ['24px', { lineHeight: '32px' }],
  'display-sm': ['30px', { lineHeight: '38px' }],
  'display-md': ['36px', { lineHeight: '44px' }],
  'display-lg': ['48px', { lineHeight: '60px' }],
  'display-xl': ['60px', { lineHeight: '72px' }],
  'display-2xl': ['72px', { lineHeight: '90px' }],
};

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...tokens.colors,
      // Semantic color aliases
      primary: tokens.colors.brand,
      destructive: tokens.colors.error,
    },
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    fontSize,
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {
      // Container max widths from design system
      maxWidth: {
        'container-mobile': '100%',
        'container-desktop': '1280px',
      },
      // Width utilities from design system (generated)
      width: tokens.width,
      // Shadow tokens from design system (manual until exported)
      boxShadow: {
        xs: '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        skeumorphic: '0px 1px 2px 0px rgba(10, 13, 18, 0.05), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18)',
      },
    },
  },
  plugins: [],
};
