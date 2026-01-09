#!/usr/bin/env node

/**
 * Sync component files to CLI registry
 * Run this after making changes to components to update the CLI package
 */

import { cpSync, rmSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const registryDir = join(root, 'packages/cli/registry')

// Components to sync
const components = ['button', 'badge', 'tag', 'button-group']
const utils = ['cx.ts', 'is-react-component.ts']

console.log('Syncing registry...')

// Clean existing registry directories
for (const dir of ['components', 'utils', 'styles']) {
  const path = join(registryDir, dir)
  if (existsSync(path)) {
    rmSync(path, { recursive: true })
  }
  mkdirSync(path, { recursive: true })
}

// Copy components
for (const component of components) {
  const src = join(root, 'src/components', component)
  const dest = join(registryDir, 'components', component)

  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true })
    console.log(`  Copied ${component}`)
  } else {
    console.log(`  Skipped ${component} (not found)`)
  }
}

// Copy utils
for (const util of utils) {
  const src = join(root, 'src/utils', util)
  const dest = join(registryDir, 'utils', util)

  if (existsSync(src)) {
    cpSync(src, dest)
    console.log(`  Copied ${util}`)
  }
}

// Copy styles
const globalsCss = join(root, 'src/styles/globals.css')
if (existsSync(globalsCss)) {
  cpSync(globalsCss, join(registryDir, 'styles/globals.css'))
  console.log('  Copied globals.css')
}

console.log('Done!')
