#!/usr/bin/env node

/**
 * Design Token Build Script
 *
 * Converts W3C Design Tokens (from Figma export) into:
 * 1. CSS custom properties with dark mode support (tokens.css)
 * 2. Tailwind config-compatible JS (tailwind-tokens.cjs)
 *
 * Usage: node scripts/build-tokens.js
 *
 * Workflow:
 * 1. Export tokens from Figma using the Variables Export plugin
 * 2. Save the JSON to tokens/all-figma.tokens.json
 * 3. Run this script to regenerate styles and config
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_FILE = path.join(__dirname, '..', 'tokens', 'all-figma.tokens.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'styles');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Parse the Figma tokens file.
 * The file should be valid JSON with named sections:
 * { primitives, lightMode, darkMode, containers, widths, spacing, radius, typography }
 */
function parseTokenFile(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse tokens file:', e.message);
    console.error('Make sure tokens/all-figma.tokens.json is valid JSON.');
    console.error('Run: node scripts/clean-tokens.cjs to fix concatenated Figma exports.');
    return {};
  }
}

/**
 * Validate CSS output for common syntax issues.
 * Catches malformed variable references and parenthetical notation.
 */
function validateCssOutput(css) {
  const issues = [];
  const lines = css.split('\n');

  lines.forEach((line, index) => {
    // Check for malformed var() references with unexpected parentheses
    // Valid: var(--color-brand-600), rgba(255, 255, 255, 0.5)
    // Invalid: var(--color-fg-brand-primary (600))
    const varMatch = line.match(/var\(--[^)]+\s+\([^)]+\)/);
    if (varMatch) {
      issues.push(`Line ${index + 1}: Malformed var() reference: ${varMatch[0]}`);
    }

    // Check for parenthetical notation in variable names
    const propMatch = line.match(/--[\w-]+\s*\([^:]+\)\s*:/);
    if (propMatch) {
      issues.push(`Line ${index + 1}: Parenthetical notation in property name: ${propMatch[0]}`);
    }
  });

  if (issues.length > 0) {
    console.warn('\n⚠️  CSS validation found issues:');
    issues.forEach(issue => console.warn(`   ${issue}`));
    console.warn('');
  }

  return issues.length === 0;
}

/**
 * Sanitize a key for CSS variable naming
 */
function sanitizeKey(key) {
  return key
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, '') // Remove parenthetical content like "(900)" or "(light mode)"
    .replace(/[^a-z0-9-]/g, '-') // Replace invalid chars with dash
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-|-$/g, ''); // Trim leading/trailing dashes
}

/**
 * Convert token key names to consistent format
 * "Gray (light mode)" -> "gray-light"
 * "Blue light" -> "blue-light"
 */
function normalizeColorKey(key) {
  return key
    .toLowerCase()
    .replace(/\s*\(light mode\)/gi, '-light')
    .replace(/\s*\(dark mode\)/gi, '-dark')
    .replace(/\s*\(dark mode alpha\)/gi, '-dark-alpha')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Extract primitive colors from the tokens
 */
function extractPrimitiveColors(primitives) {
  const colors = {};

  if (!primitives?.Colors) return colors;

  for (const [groupName, group] of Object.entries(primitives.Colors)) {
    const normalizedGroup = normalizeColorKey(groupName);

    // Skip dark mode gray (solid) - it's used via semantic tokens for theming
    // But keep "Gray (dark mode alpha)" for RGBA transparency colors
    // Also keep color scales like "Orange dark", "Blue dark"
    if (groupName === 'Gray (dark mode)') continue;

    colors[normalizedGroup] = {};

    for (const [shade, token] of Object.entries(group)) {
      if (token.$value) {
        colors[normalizedGroup][shade] = token.$value;
      }
    }
  }

  // Extract dark mode gray separately for reference in dark theme
  if (primitives.Colors['Gray (dark mode)']) {
    colors['gray-dark'] = {};
    for (const [shade, token] of Object.entries(primitives.Colors['Gray (dark mode)'])) {
      if (token.$value) {
        colors['gray-dark'][shade] = token.$value;
      }
    }
  }

  return colors;
}

/**
 * Extract primitive spacing values
 */
function extractPrimitiveSpacing(primitives) {
  const spacing = {};

  if (!primitives?.Spacing) return spacing;

  for (const [key, token] of Object.entries(primitives.Spacing)) {
    // Key is like "4 (16px)" - extract the number
    const match = key.match(/^([\d.․]+)/);
    if (match && token.$value !== undefined) {
      // Handle special dot character (․) used for 0.5, 1.5
      const numKey = match[1].replace('․', '.');
      spacing[numKey] = `${token.$value}px`;
    }
  }

  // Add Tailwind default fractional values that may not be in Figma
  // These are commonly used in Tailwind components
  const tailwindFractionals = {
    '2.5': '10px',   // 2.5 * 4px
    '3.5': '14px',   // 3.5 * 4px
  };

  for (const [key, value] of Object.entries(tailwindFractionals)) {
    if (!spacing[key]) {
      spacing[key] = value;
    }
  }

  return spacing;
}

/**
 * Resolve a token reference like "{Colors.Gray (light mode).900}"
 * Returns the CSS variable reference or the resolved value
 *
 * @param {string} value - The value to resolve
 * @param {object} primitives - Primitive tokens for direct value lookup
 * @param {boolean} useCssVar - Whether to return CSS var() references
 * @param {object} componentColorsMap - Map of component color keys to their values (for two-pass resolution)
 */
function resolveTokenReference(value, primitives, useCssVar = true, componentColorsMap = null) {
  if (typeof value !== 'string') return value;

  // Check if it's a reference
  const refMatch = value.match(/^\{([^}]+)\}$/);
  if (!refMatch) return value;

  const refPath = refMatch[1];

  // Handle Component colors references like "{Component colors.Utility.Gray.utility-gray-50}"
  if (refPath.startsWith('Component colors.')) {
    const pathParts = refPath.replace('Component colors.', '').split('.');
    // Build a CSS variable name from the path parts
    // e.g., "Utility.Gray.utility-gray-50" -> "utility-gray-utility-gray-50"
    const varName = pathParts.map(p => sanitizeKey(p)).join('-');

    // If we have a component colors map, try to resolve directly
    if (componentColorsMap) {
      const lookupKey = varName;
      if (componentColorsMap[lookupKey]) {
        return componentColorsMap[lookupKey];
      }
    }

    return `var(--color-${varName})`;
  }

  // Parse the reference path
  if (refPath.startsWith('Colors.')) {
    const parts = refPath.replace('Colors.', '').split('.');

    // Handle nested references like "Colors.Foreground.fg-brand-primary (600)"
    if (parts.length === 2) {
      const [group, rawShade] = parts;
      const normalizedGroup = normalizeColorKey(group);

      // Strip parenthetical notation from shade (e.g., "fg-brand-primary (600)" -> "fg-brand-primary")
      // This is critical for generating valid CSS variable names
      const shade = rawShade.replace(/\s*\([^)]*\)\s*$/, '');
      const sanitizedShade = sanitizeKey(shade);

      // For semantic references (Foreground, Background, Text, Border categories)
      // These reference other semantic tokens, not primitives
      if (['text', 'border', 'foreground', 'background'].some(s => normalizedGroup.includes(s))) {
        // Return CSS variable reference
        if (useCssVar) {
          return `var(--color-${sanitizedShade})`;
        }
        // When not using CSS vars, we need to resolve to the actual value
        // Look up the referenced semantic token from the light mode colors
        // For now, return the CSS variable reference since semantic tokens
        // are defined in the same build process
        return `var(--color-${sanitizedShade})`;
      }

      // For primitive references, return CSS variable to primitive
      if (normalizedGroup === 'base') {
        return `var(--color-base-${sanitizedShade})`;
      }

      // For color scales (Gray, Brand, etc.)
      // The shade here is already a simple value like "600", "900"
      return `var(--color-${normalizedGroup}-${shade})`;
    }
  }

  // For spacing references
  if (refPath.startsWith('Spacing.')) {
    const spacingKey = refPath.replace('Spacing.', '');
    const match = spacingKey.match(/^([\d.․]+)/);
    if (match) {
      const numKey = match[1].replace('․', '.');
      return `var(--spacing-${numKey.replace('.', '_')})`;
    }
  }

  return value;
}

/**
 * Resolve all references in a colors map iteratively.
 * This handles tokens that reference other tokens (including Component colors references).
 *
 * @param {object} colors - Map of color keys to values
 * @param {object} primitiveColors - Resolved primitive colors for lookup
 * @param {number} maxIterations - Maximum resolution iterations to prevent infinite loops
 * @returns {object} - Colors with all references resolved
 */
function resolveAllReferences(colors, primitiveColors, maxIterations = 10) {
  const resolved = { ...colors };
  let iteration = 0;
  let hasUnresolvedRefs = true;

  while (hasUnresolvedRefs && iteration < maxIterations) {
    hasUnresolvedRefs = false;
    iteration++;

    for (const [key, value] of Object.entries(resolved)) {
      if (typeof value !== 'string') continue;

      // Check for unresolved Figma references like {Component colors.Utility.Gray.utility-gray-50}
      const figmaRefMatch = value.match(/^\{([^}]+)\}$/);
      if (figmaRefMatch) {
        hasUnresolvedRefs = true;
        const refPath = figmaRefMatch[1];

        // Handle Component colors references
        if (refPath.startsWith('Component colors.')) {
          const pathParts = refPath.replace('Component colors.', '').split('.');
          const lookupKey = pathParts.map(p => sanitizeKey(p)).join('-');

          // Try to find in our resolved map
          if (resolved[lookupKey] && resolved[lookupKey] !== value) {
            resolved[key] = resolved[lookupKey];
            continue;
          }
        }

        // Try standard resolution
        const newValue = resolveTokenReference(value, {}, false, resolved);
        if (newValue !== value) {
          resolved[key] = newValue;
        }
      }

      // Check for CSS var references that might need further resolution
      const varMatch = value.match(/^var\(--color-([^)]+)\)$/);
      if (varMatch) {
        const varPath = varMatch[1];

        // Try to resolve from resolved map first
        if (resolved[varPath] && !resolved[varPath].startsWith('var(')) {
          resolved[key] = resolved[varPath];
          continue;
        }

        // Try to resolve from primitives
        const parts = varPath.split('-');
        if (parts.length >= 2) {
          const colorName = parts.slice(0, -1).join('-');
          const shade = parts[parts.length - 1];

          if (primitiveColors[colorName] && primitiveColors[colorName][shade]) {
            resolved[key] = primitiveColors[colorName][shade];
            continue;
          }

          // Try longer color names (e.g., "gray-light-900")
          for (const [name, shades] of Object.entries(primitiveColors)) {
            if (varPath.startsWith(name + '-')) {
              const shadeKey = varPath.replace(name + '-', '');
              if (shades[shadeKey]) {
                resolved[key] = shades[shadeKey];
                break;
              }
            }
          }
        }
      }
    }
  }

  if (iteration >= maxIterations) {
    const unresolvedCount = Object.values(resolved).filter(v =>
      typeof v === 'string' && (v.includes('{') || v.startsWith('var('))
    ).length;
    if (unresolvedCount > 0) {
      console.warn(`⚠️  ${unresolvedCount} tokens still have unresolved references after ${maxIterations} iterations`);
    }
  }

  return resolved;
}

/**
 * Extract semantic colors from light/dark mode sections
 * Handles both "Colors" and "Component colors" top-level keys
 * Recursively extracts nested tokens
 *
 * NOTE: The Figma tokens have a structure like:
 *   Colors > Text > "text-primary (900)"
 *   Colors > Border > "border-primary"
 *   Colors > Foreground > "fg-primary (900)"
 *   Colors > Background > "bg-primary"
 *
 * The token keys already contain their category prefix (text-, border-, fg-, bg-),
 * so we should NOT add the parent category to avoid redundant names like "text-text-primary".
 */
function extractSemanticColors(modeTokens, primitives, mode = 'light') {
  const colors = {};

  // Categories where the token keys already include the type prefix
  const selfPrefixedCategories = ['text', 'border', 'foreground', 'background', 'alpha'];

  // Helper to check if a key starts with a known semantic prefix
  function hasSemanticPrefix(key) {
    const sanitized = sanitizeKey(key);
    return sanitized.startsWith('text-') ||
           sanitized.startsWith('border-') ||
           sanitized.startsWith('fg-') ||
           sanitized.startsWith('bg-') ||
           sanitized.startsWith('alpha-');
  }

  // Helper to recursively extract tokens
  function extractTokens(obj, prefix = '', parentCategory = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (!value || typeof value !== 'object') continue;

      if (value.$value !== undefined) {
        // This is a token
        const sanitizedKey = sanitizeKey(key);

        // If parent is a self-prefixed category AND the key already has a semantic prefix,
        // don't add the parent category to avoid "text-text-primary" redundancy
        const parentCategorySanitized = sanitizeKey(parentCategory);
        const skipPrefix = selfPrefixedCategories.includes(parentCategorySanitized) && hasSemanticPrefix(key);

        let varName;
        if (skipPrefix) {
          // Use just the token key (which already has its prefix like "text-primary")
          varName = sanitizedKey;
        } else {
          varName = prefix ? `${prefix}-${sanitizedKey}` : sanitizedKey;
        }

        colors[varName] = resolveTokenReference(value.$value, primitives, false);
      } else {
        // This is a category or sub-category, recurse
        const sanitizedKey = sanitizeKey(key);
        const newPrefix = prefix ? `${prefix}-${sanitizedKey}` : sanitizedKey;
        extractTokens(value, newPrefix, key);
      }
    }
  }

  // Extract from "Colors" section
  if (modeTokens?.Colors) {
    extractTokens(modeTokens.Colors);
  }

  // Extract from "Component colors" section
  if (modeTokens?.['Component colors']) {
    extractTokens(modeTokens['Component colors']);
  }

  return colors;
}

/**
 * Resolve all references in semantic colors to actual values.
 * Uses two-pass resolution to handle Component colors and other cross-references.
 */
function resolveSemanticColors(semanticColors, primitiveColors) {
  // Use the new two-pass resolution
  return resolveAllReferences(semanticColors, primitiveColors);
}

/**
 * Recursively resolve a value that might contain CSS var references
 */
function resolveValue(value, primitiveColors) {
  if (typeof value !== 'string') return value;

  // Check if it's a var reference
  const varMatch = value.match(/^var\(--color-([^)]+)\)$/);
  if (!varMatch) return value;

  const varPath = varMatch[1];
  const parts = varPath.split('-');

  // Try to resolve from primitives
  if (parts.length >= 2) {
    // Handle "base-white", "gray-900", "brand-600"
    const colorName = parts.slice(0, -1).join('-');
    const shade = parts[parts.length - 1];

    if (primitiveColors[colorName] && primitiveColors[colorName][shade]) {
      return primitiveColors[colorName][shade];
    }

    // Handle single-part color names like "gray-light-900"
    for (const [name, shades] of Object.entries(primitiveColors)) {
      if (varPath.startsWith(name + '-')) {
        const shadeKey = varPath.replace(name + '-', '');
        if (shades[shadeKey]) {
          return shades[shadeKey];
        }
      }
    }
  }

  return value;
}

/**
 * Extract radius tokens
 */
function extractRadius(radiusTokens) {
  const radius = {};

  for (const [key, token] of Object.entries(radiusTokens || {})) {
    const name = sanitizeKey(key.replace('radius-', ''));
    if (token.$value !== undefined) {
      radius[name] = token.$value === 9999 ? '9999px' : `${token.$value}px`;
    }
  }

  return radius;
}

/**
 * Extract semantic spacing tokens and resolve references
 */
function extractSemanticSpacing(spacingTokens, primitiveSpacing) {
  const spacing = {};

  for (const [key, token] of Object.entries(spacingTokens || {})) {
    const name = sanitizeKey(key.replace('spacing-', ''));
    if (token.$value) {
      // Resolve spacing reference like "{Spacing.0 (0px)}" or "{Spacing.0․5 (2px)}"
      const spacingMatch = token.$value.match(/\{Spacing\.([\d․.]+)\s+\([^)]+\)\}/);
      if (spacingMatch) {
        const spacingKey = spacingMatch[1].replace('․', '.');
        spacing[name] = primitiveSpacing[spacingKey] || `${spacingMatch[1]}px`;
      } else {
        spacing[name] = token.$value;
      }
    }
  }

  return spacing;
}

/**
 * Extract container tokens
 */
function extractContainers(containerTokens, primitiveSpacing) {
  const containers = {};

  for (const [key, token] of Object.entries(containerTokens || {})) {
    const name = sanitizeKey(key);
    if (token.$value) {
      // Resolve spacing reference
      const spacingMatch = token.$value.match(/\{Spacing\.([\d,]+)\s+\(([^)]+)\)\}/);
      if (spacingMatch) {
        const spacingKey = spacingMatch[1].replace(',', '');
        const fallbackValue = spacingMatch[2].replace(',', '');
        containers[name] = primitiveSpacing[spacingKey] || fallbackValue;
      } else {
        containers[name] = token.$value;
      }
    }
  }

  return containers;
}

/**
 * Extract width tokens and resolve spacing references
 */
function extractWidths(widthTokens, spacingValues) {
  const widths = {};

  for (const [key, token] of Object.entries(widthTokens || {})) {
    // Include width-* tokens and paragraph-max-width
    if (key.startsWith('width-') || key === 'paragraph-max-width') {
      const name = key.startsWith('width-')
        ? sanitizeKey(key.replace('width-', ''))
        : sanitizeKey(key);
      if (token.$value) {
        // Resolve spacing reference like "{Spacing.80 (320px)}"
        const spacingMatch = token.$value.match(/\{Spacing\.(\d+)\s+\(([^)]+)\)\}/);
        if (spacingMatch) {
          // Use the value from spacing or extract from parentheses
          const spacingKey = spacingMatch[1];
          const fallbackValue = spacingMatch[2].replace(',', '');
          widths[name] = spacingValues[spacingKey] || fallbackValue;
        } else {
          widths[name] = token.$value;
        }
      }
    }
  }

  return widths;
}

/**
 * Extract typography tokens (font family, weight, size, line height)
 */
function extractTypography(typographyTokens) {
  const typography = {
    fontFamily: {},
    fontWeight: {},
    fontSize: {},
    lineHeight: {},
  };

  if (!typographyTokens) return typography;

  // Extract font families
  if (typographyTokens['Font family']) {
    for (const [key, token] of Object.entries(typographyTokens['Font family'])) {
      if (token.$value) {
        const name = sanitizeKey(key.replace('font-family-', ''));
        typography.fontFamily[name] = token.$value;
      }
    }
  }

  // Extract font weights
  if (typographyTokens['Font weight']) {
    for (const [key, token] of Object.entries(typographyTokens['Font weight'])) {
      if (token.$value) {
        const name = sanitizeKey(key);
        // Convert weight names to numeric values for CSS
        const weightMap = {
          'regular': '400',
          'regular-italic': '400',
          'medium': '500',
          'medium-italic': '500',
          'semibold': '600',
          'semibold-italic': '600',
          'bold': '700',
          'bold-italic': '700',
        };
        typography.fontWeight[name] = weightMap[name] || token.$value;
      }
    }
  }

  // Extract font sizes (strip "text-" prefix for Tailwind compatibility)
  if (typographyTokens['Font size']) {
    for (const [key, token] of Object.entries(typographyTokens['Font size'])) {
      if (token.$value !== undefined) {
        const name = sanitizeKey(key).replace(/^text-/, '');
        typography.fontSize[name] = `${token.$value}px`;
      }
    }
  }

  // Extract line heights (strip "text-" prefix for Tailwind compatibility)
  if (typographyTokens['Line height']) {
    for (const [key, token] of Object.entries(typographyTokens['Line height'])) {
      if (token.$value !== undefined) {
        const name = sanitizeKey(key).replace(/^text-/, '');
        typography.lineHeight[name] = `${token.$value}px`;
      }
    }
  }

  return typography;
}

/**
 * Generate CSS custom properties
 */
function generateCSS(primitiveColors, primitiveSpacing, lightSemanticColors, darkSemanticColors, radius, widths, typography, semanticSpacing, containers) {
  let css = `/**
 * Design Tokens - Generated from Figma
 * DO NOT EDIT MANUALLY - Run \`npm run build:tokens\` to regenerate
 *
 * DARK MODE: Components should use semantic tokens (--color-text-*, --color-bg-*, --color-border-*)
 * instead of primitive color scales for grayscale colors. Semantic tokens automatically
 * adapt to the theme via [data-theme="dark"] selector.
 *
 * Toggle dark mode: document.documentElement.dataset.theme = "dark"
 */

:root {
  /* ============================================
   * Primitive Colors
   * ============================================ */
`;

  // Primitive colors
  for (const [colorName, shades] of Object.entries(primitiveColors)) {
    css += `\n  /* ${colorName} */\n`;
    for (const [shade, value] of Object.entries(shades)) {
      css += `  --color-${colorName}-${shade}: ${value};\n`;
    }
  }

  // Primitive spacing
  css += `\n  /* ============================================
   * Primitive Spacing
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(primitiveSpacing)) {
    const varKey = key.replace('.', '_');
    css += `  --spacing-${varKey}: ${value};\n`;
  }

  // Radius
  css += `\n  /* ============================================
   * Border Radius
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(radius)) {
    css += `  --radius-${key}: ${value};\n`;
  }

  // Widths
  css += `\n  /* ============================================
   * Widths
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(widths)) {
    css += `  --width-${key}: ${value};\n`;
  }

  // Typography
  css += `\n  /* ============================================
   * Typography
   * ============================================ */\n`;

  css += `\n  /* Font Family */\n`;
  for (const [key, value] of Object.entries(typography.fontFamily)) {
    css += `  --font-family-${key}: ${value};\n`;
  }

  css += `\n  /* Font Weight */\n`;
  for (const [key, value] of Object.entries(typography.fontWeight)) {
    css += `  --font-weight-${key}: ${value};\n`;
  }

  css += `\n  /* Font Size */\n`;
  for (const [key, value] of Object.entries(typography.fontSize)) {
    css += `  --font-size-${key}: ${value};\n`;
  }

  css += `\n  /* Line Height */\n`;
  for (const [key, value] of Object.entries(typography.lineHeight)) {
    css += `  --line-height-${key}: ${value};\n`;
  }

  // Semantic spacing
  css += `\n  /* ============================================
   * Semantic Spacing
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(semanticSpacing)) {
    css += `  --spacing-${key}: ${value};\n`;
  }

  // Containers
  css += `\n  /* ============================================
   * Containers
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(containers)) {
    css += `  --${key}: ${value};\n`;
  }

  // Light mode semantic colors (default)
  css += `\n  /* ============================================
   * Semantic Colors (Light Mode - Default)
   * ============================================ */\n`;
  for (const [key, value] of Object.entries(lightSemanticColors)) {
    css += `  --color-${key}: ${value};\n`;
  }

  css += `}\n`;

  // Dark mode overrides
  css += `\n/* Dark Mode */
[data-theme="dark"] {\n`;
  for (const [key, value] of Object.entries(darkSemanticColors)) {
    // Only include if different from light mode
    if (lightSemanticColors[key] !== value) {
      css += `  --color-${key}: ${value};\n`;
    }
  }
  css += `}\n`;

  // Media query for system preference
  css += `\n/* System preference dark mode */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {\n`;
  for (const [key, value] of Object.entries(darkSemanticColors)) {
    if (lightSemanticColors[key] !== value) {
      css += `    --color-${key}: ${value};\n`;
    }
  }
  css += `  }
}\n`;

  return css;
}

/**
 * Generate Tailwind config
 */
function generateTailwindConfig(primitiveColors, primitiveSpacing, lightSemanticColors, radius, widths, typography, semanticSpacing, containers) {
  // Build colors object
  const colors = {};

  // Add primitive colors (static values for direct access)
  for (const [colorName, shades] of Object.entries(primitiveColors)) {
    colors[colorName] = {};
    for (const [shade, value] of Object.entries(shades)) {
      colors[colorName][shade] = value;
    }
  }

  // Add semantic color references using CSS variables
  // These are now properly named without redundancy (e.g., "text-primary" not "text-text-primary")
  const semanticCategories = {
    text: {},
    border: {},
    fg: {},
    bg: {},
  };

  for (const [key, value] of Object.entries(lightSemanticColors)) {
    const varRef = `var(--color-${key})`;

    if (key.startsWith('text-')) {
      // Keys are like "text-primary" -> extract "primary" for text.primary
      // This creates classes like text-text-primary (text utility + text.primary color)
      const name = key.replace('text-', '').replace(/_/g, '-');
      semanticCategories.text[name] = varRef;
    } else if (key.startsWith('border-')) {
      // Keys are like "border-primary" -> extract "primary" for border.primary
      const name = key.replace('border-', '').replace(/_/g, '-');
      semanticCategories.border[name] = varRef;
    } else if (key.startsWith('fg-')) {
      // Keys are like "fg-primary" -> extract "primary" for fg.primary
      const name = key.replace('fg-', '').replace(/_/g, '-');
      semanticCategories.fg[name] = varRef;
    } else if (key.startsWith('bg-')) {
      // Keys are like "bg-primary" -> extract "primary" for bg.primary
      const name = key.replace('bg-', '').replace(/_/g, '-');
      semanticCategories.bg[name] = varRef;
    }
  }

  Object.assign(colors, semanticCategories);

  // Add semantic aliases for primitive color scales
  colors.primary = colors.brand;
  colors.destructive = colors.error;

  // Build utility-specific configs for semantic colors
  // This allows text-primary, bg-primary, border-primary to use semantic CSS variables
  // while text-brand-500 still accesses the primitive brand scale
  const textColor = {};
  const backgroundColor = {};
  const borderColor = {};

  // Map semantic text colors to textColor
  for (const [key, value] of Object.entries(semanticCategories.text)) {
    textColor[key] = value;
  }
  // Add foreground colors as text colors too (fg-* becomes usable as text-fg-*)
  for (const [key, value] of Object.entries(semanticCategories.fg)) {
    textColor[`fg-${key}`] = value;
  }
  // Add component text colors (tokens ending with -text or -supporting-text)
  // e.g., components-tooltips-tooltip-supporting-text -> text-tooltip-supporting-text
  for (const [key, value] of Object.entries(lightSemanticColors)) {
    if (key.startsWith('components-') && key.endsWith('-text')) {
      // Extract the meaningful part: "components-tooltips-tooltip-supporting-text" -> "tooltip-supporting-text"
      const parts = key.split('-');
      // Find the last occurrence of a component-specific name (skip "components" and category like "tooltips")
      const componentIndex = parts.findIndex((p, i) => i > 1 && parts.slice(i).join('-').endsWith('-text'));
      if (componentIndex > 0) {
        const shortKey = parts.slice(componentIndex).join('-');
        textColor[shortKey] = `var(--color-${key})`;
      }
    }
  }

  // Map semantic background colors to backgroundColor
  for (const [key, value] of Object.entries(semanticCategories.bg)) {
    backgroundColor[key] = value;
  }

  // Map semantic border colors to borderColor
  for (const [key, value] of Object.entries(semanticCategories.border)) {
    borderColor[key] = value;
  }

  // Build unified semanticColors object for ALL color utilities (ring, fill, stroke, etc.)
  // This allows ring-border-primary, stroke-fg-primary, fill-bg-primary, etc.
  const semanticColors = {};
  for (const [key] of Object.entries(lightSemanticColors)) {
    semanticColors[key] = `var(--color-${key})`;
  }

  // Build spacing object (primitive only)
  // NOTE: Semantic spacing names (sm, md, lg, xl, etc.) are intentionally excluded
  // from the Tailwind spacing scale because they conflict with Tailwind v4's derived
  // utilities (max-w-sm, min-w-lg, etc.). Semantic spacing is still available via
  // CSS variables (--spacing-sm, --spacing-lg) generated in tokens.css.
  const spacing = {};
  for (const [key, value] of Object.entries(primitiveSpacing)) {
    spacing[key] = value;
  }

  // Build maxWidth object from containers
  const maxWidth = {};
  for (const [key, value] of Object.entries(containers)) {
    maxWidth[key] = value;
  }

  // Build borderRadius object
  const borderRadius = {};
  for (const [key, value] of Object.entries(radius)) {
    borderRadius[key] = value;
  }
  // Add DEFAULT for Tailwind's `rounded` class (maps to xs = 4px)
  if (borderRadius.xs) {
    borderRadius.DEFAULT = borderRadius.xs;
  }

  // Build width object
  const width = {
    // CSS intrinsic sizing values - Tailwind defaults that must be preserved
    auto: 'auto',
    full: '100%',
    screen: '100vw',
    svw: '100svw',
    lvw: '100lvw',
    dvw: '100dvw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  };
  for (const [key, value] of Object.entries(widths)) {
    // Convert spacing references to actual values
    const refMatch = typeof value === 'string' && value.match(/var\(--spacing-([\d_]+)\)/);
    if (refMatch) {
      const spacingKey = refMatch[1].replace('_', '.');
      width[key] = primitiveSpacing[spacingKey] || value;
    } else if (typeof value === 'number') {
      width[key] = `${value}px`;
    } else {
      width[key] = value;
    }
  }

  // Helper to format JS objects - keeps quotes for keys that need them
  function formatJsObject(obj) {
    return JSON.stringify(obj, null, 2)
      .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:')  // Unquote simple keys
      .replace(/"/g, "'");  // Use single quotes for values
  }

  // Build fontSize object (with line heights for Tailwind format)
  const fontSize = {};
  for (const [key, value] of Object.entries(typography.fontSize)) {
    const lineHeightKey = key; // Same key pattern
    const lineHeight = typography.lineHeight[lineHeightKey];
    if (lineHeight) {
      fontSize[key] = [value, { lineHeight }];
    } else {
      fontSize[key] = value;
    }
  }

  // Build fontFamily object
  const fontFamily = {};
  for (const [key, value] of Object.entries(typography.fontFamily)) {
    fontFamily[key] = [value, 'system-ui', 'sans-serif'];
  }

  // Build fontWeight object
  const fontWeight = {};
  for (const [key, value] of Object.entries(typography.fontWeight)) {
    fontWeight[key] = value;
  }

  // Generate the config file content
  const config = `/**
 * Tailwind Design Tokens - Generated from Figma
 * DO NOT EDIT MANUALLY - Run \`npm run build:tokens\` to regenerate
 *
 * DARK MODE SUPPORT:
 * For components to properly respond to dark mode, use SEMANTIC tokens instead of primitives:
 *
 * ❌ DON'T: text-gray-700, bg-gray-50, border-gray-300, ring-gray-200
 * ✅ DO:    text-secondary, bg-secondary, border-primary, ring-border-secondary
 *
 * Semantic tokens use CSS variables that change with [data-theme="dark"].
 * Primitive color scales (gray-light, brand, error, etc.) are static values.
 *
 * See .cursor/rules/design-tokens.mdc for the full mapping reference.
 */

module.exports = {
  colors: ${formatJsObject(colors)},

  // Unified semantic colors for ALL color utilities (ring, fill, stroke, divide, etc.)
  // Use these with: ring-border-primary, stroke-fg-primary, fill-bg-primary, etc.
  semanticColors: ${formatJsObject(semanticColors)},

  // Utility-specific semantic colors (legacy - for backward compatibility)
  // These allow text-primary, bg-primary, border-primary to use semantic CSS variables
  textColor: ${formatJsObject(textColor)},

  backgroundColor: ${formatJsObject(backgroundColor)},

  borderColor: ${formatJsObject(borderColor)},

  spacing: ${formatJsObject(spacing)},

  borderRadius: ${formatJsObject(borderRadius)},

  width: ${formatJsObject(width)},

  // CSS intrinsic sizing values for height - Tailwind defaults that must be preserved
  height: {
    auto: 'auto',
    full: '100%',
    screen: '100vh',
    svh: '100svh',
    lvh: '100lvh',
    dvh: '100dvh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  // CSS intrinsic sizing values for min/max dimensions
  minWidth: {
    full: '100%',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  maxWidth: ${formatJsObject(maxWidth)},

  minHeight: {
    full: '100%',
    screen: '100vh',
    svh: '100svh',
    lvh: '100lvh',
    dvh: '100dvh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  maxHeight: {
    full: '100%',
    screen: '100vh',
    svh: '100svh',
    lvh: '100lvh',
    dvh: '100dvh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  fontSize: ${formatJsObject(fontSize)},

  fontFamily: ${formatJsObject(fontFamily)},

  fontWeight: ${formatJsObject(fontWeight)},
};
`;

  return config;
}

/**
 * Main build function
 */
async function build() {
  console.log('Building design tokens...\n');

  // Read the token file
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error(`Token file not found: ${TOKENS_FILE}`);
    console.error('Please export tokens from Figma and save to tokens/all-figma.tokens.json');
    process.exit(1);
  }

  const content = fs.readFileSync(TOKENS_FILE, 'utf8');
  console.log('Parsing token file...');

  // Parse the multi-section token file
  const sections = parseTokenFile(content);

  console.log('Found sections:', Object.keys(sections).join(', '));

  // Extract primitive tokens
  const primitiveColors = extractPrimitiveColors(sections.primitives);
  const primitiveSpacing = extractPrimitiveSpacing(sections.primitives);

  console.log(`  - ${Object.keys(primitiveColors).length} color groups`);
  console.log(`  - ${Object.keys(primitiveSpacing).length} spacing values`);

  // Extract semantic tokens
  const lightSemanticRaw = extractSemanticColors(sections.lightMode, sections.primitives, 'light');
  const darkSemanticRaw = extractSemanticColors(sections.darkMode, sections.primitives, 'dark');

  // Resolve semantic colors to actual values
  const lightSemanticColors = resolveSemanticColors(lightSemanticRaw, primitiveColors);
  const darkSemanticColors = resolveSemanticColors(darkSemanticRaw, primitiveColors);

  console.log(`  - ${Object.keys(lightSemanticColors).length} light mode semantic colors`);
  console.log(`  - ${Object.keys(darkSemanticColors).length} dark mode semantic colors`);

  // Extract other tokens
  const radius = extractRadius(sections.radius);
  const widths = extractWidths(sections.widths, primitiveSpacing);
  const typography = extractTypography(sections.typography);
  const semanticSpacing = extractSemanticSpacing(sections.spacing, primitiveSpacing);
  const containers = extractContainers(sections.containers, primitiveSpacing);

  console.log(`  - ${Object.keys(radius).length} radius values`);
  console.log(`  - ${Object.keys(widths).length} width values`);
  console.log(`  - ${Object.keys(typography.fontSize).length} font sizes, ${Object.keys(typography.lineHeight).length} line heights`);
  console.log(`  - ${Object.keys(semanticSpacing).length} semantic spacing values`);
  console.log(`  - ${Object.keys(containers).length} container values`);

  // Generate CSS
  const css = generateCSS(primitiveColors, primitiveSpacing, lightSemanticColors, darkSemanticColors, radius, widths, typography, semanticSpacing, containers);

  // Validate CSS output
  const isValid = validateCssOutput(css);
  if (!isValid) {
    console.warn('CSS generated with warnings. Review the issues above.');
  }

  const cssPath = path.join(OUTPUT_DIR, 'tokens.css');
  fs.writeFileSync(cssPath, css);
  console.log(`\nGenerated: ${cssPath}`);

  // Generate Tailwind config
  const tailwindConfig = generateTailwindConfig(primitiveColors, primitiveSpacing, lightSemanticColors, radius, widths, typography, semanticSpacing, containers);
  const tailwindPath = path.join(OUTPUT_DIR, 'tailwind-tokens.cjs');
  fs.writeFileSync(tailwindPath, tailwindConfig);
  console.log(`Generated: ${tailwindPath}`);

  console.log('\nDone! Your design tokens are ready.');
  console.log('\nNext steps:');
  console.log('1. Import tokens.css in your app: @import "./styles/tokens.css"');
  console.log('2. The tailwind.config.cjs uses the generated tailwind-tokens.cjs');
  console.log('3. Toggle dark mode with: document.documentElement.dataset.theme = "dark"');
}

build().catch(console.error);
