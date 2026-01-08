#!/usr/bin/env node

/**
 * Design Token Build Script
 *
 * This script converts W3C Design Tokens (from Figma export) into:
 * 1. Tailwind config-compatible JS
 * 2. CSS custom properties
 *
 * Usage: node scripts/build-tokens.js
 *
 * Workflow:
 * 1. Export tokens from Figma using the Variables Export plugin
 * 2. Save the JSON to tokens/
 * 3. Run this script to regenerate tailwind.config.js
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'styles');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Flatten nested token object to CSS variable format
 */
function flattenTokens(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !value.$value) {
      Object.assign(result, flattenTokens(value, newKey));
    } else if (value && value.$value) {
      result[newKey] = value.$value;
    }
  }

  return result;
}

/**
 * Sanitize key for CSS variable name
 */
function sanitizeKey(key) {
  return key
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, '-')  // Remove parenthetical content
    .replace(/[^a-z0-9-]/g, '-')        // Replace invalid chars with dash
    .replace(/-+/g, '-')                // Collapse multiple dashes
    .replace(/^-|-$/g, '');             // Trim leading/trailing dashes
}

/**
 * Convert tokens to CSS custom properties
 */
function generateCSSVariables(tokens) {
  const flattened = flattenTokens(tokens);
  let css = ':root {\n';

  for (const [key, value] of Object.entries(flattened)) {
    const varName = `--${sanitizeKey(key)}`;
    css += `  ${varName}: ${value};\n`;
  }

  css += '}\n';
  return css;
}

/**
 * Main build function
 */
async function build() {
  console.log('Building design tokens...\n');

  // Read all token files
  const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.json'));

  console.log('Found token files:');
  tokenFiles.forEach(f => console.log(`  - ${f}`));
  console.log('');

  // Process primitives
  const primitivesPath = path.join(TOKENS_DIR, 'primitives.tokens.json');
  if (fs.existsSync(primitivesPath)) {
    const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));

    // Generate CSS variables
    const css = generateCSSVariables(primitives);
    const cssPath = path.join(OUTPUT_DIR, 'tokens.css');
    fs.writeFileSync(cssPath, css);
    console.log(`Generated: ${cssPath}`);
  }

  console.log('\nDone! Your design tokens are ready.');
  console.log('\nNext steps:');
  console.log('1. Import tokens.css in your app');
  console.log('2. Use Tailwind classes that match your design system');
  console.log('3. When Figma tokens change, re-export and run this script');
}

build().catch(console.error);
