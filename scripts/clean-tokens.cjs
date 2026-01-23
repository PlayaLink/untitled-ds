#!/usr/bin/env node
/**
 * clean-tokens.js
 *
 * Converts the concatenated Figma tokens JSON file (with comment separators)
 * into a single valid JSON file with named sections.
 *
 * Input: tokens/all-figma.tokens.json (invalid - multiple JSON objects with comments)
 * Output: tokens/all-figma.tokens.json (valid - single JSON object with named sections)
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../tokens/all-figma.tokens.json');
const outputFile = inputFile; // Overwrite the same file

console.log('Reading tokens file...');
const content = fs.readFileSync(inputFile, 'utf-8');

// Split by comment markers
// The pattern is: } followed by whitespace and /* ... */
const sections = content.split(/\}\s*\n\s*\n\s*\/\*[^*]*\*\/\s*\n\s*\{/);

console.log(`Found ${sections.length} sections`);

// Extract the comment names to use as keys
const commentPattern = /\/\*\s*([^*]+)\s*\*\//g;
const comments = [...content.matchAll(commentPattern)].map(m => m[1].trim());

console.log('Section comments:', comments);

// The first section doesn't have a preceding comment, it's the primitives
// Subsequent comments are:
// 1. Color modes.Light mode.tokens.json
// 1. Color modes.Dark mode.tokens.json
// 5. Containers.Value.tokens.json
// 4. Widths.Mode 1.tokens.json
// 3. Spacing.Mode 1.tokens.json
// 2. Radius.Mode 1.tokens.json
// 6. Typography.Value.tokens.json

const sectionNames = [
  'primitives',
  'lightMode',
  'darkMode',
  'containers',
  'widths',
  'spacing',
  'radius',
  'typography'
];

// Parse each section
const result = {};
sections.forEach((section, index) => {
  // Clean up the section - add back the braces if needed
  let jsonStr = section.trim();

  // First section starts with {, others don't (they were split at {)
  if (index === 0) {
    // First section is complete
    jsonStr = jsonStr;
  } else {
    // Add back the opening brace
    jsonStr = '{' + jsonStr;
  }

  // Last part of each section except the last one is missing closing brace
  if (index < sections.length - 1) {
    jsonStr = jsonStr + '}';
  }

  try {
    const parsed = JSON.parse(jsonStr);
    result[sectionNames[index]] = parsed;
    console.log(`✓ Parsed ${sectionNames[index]} successfully`);
  } catch (e) {
    console.error(`✗ Failed to parse ${sectionNames[index]}:`, e.message);
    // Write the problematic section to a debug file
    fs.writeFileSync(
      path.join(__dirname, `../tokens/debug-${sectionNames[index]}.json`),
      jsonStr
    );
    console.log(`  Wrote debug file: tokens/debug-${sectionNames[index]}.json`);
  }
});

// Write the clean JSON file
console.log('\nWriting clean JSON file...');
const output = JSON.stringify(result, null, 2);
fs.writeFileSync(outputFile, output);
console.log(`✓ Wrote ${outputFile}`);
console.log(`  File size: ${(output.length / 1024).toFixed(1)} KB`);
