import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import pc from 'picocolors'
import ora from 'ora'
import prompts from 'prompts'
import { copyFiles } from '../lib/file-operations.js'
import { getRegistryItem, getRegistryPath } from '../lib/registry.js'
import {
  getMissingDependencies,
  installDependencies,
} from '../lib/dependency-manager.js'

interface InitOptions {
  yes?: boolean
}

export async function init(options: InitOptions) {
  const cwd = process.cwd()

  console.log()
  console.log(pc.bold('Initializing Untitled Design System'))
  console.log()

  // Check for existing config
  const hasTailwind =
    existsSync(join(cwd, 'tailwind.config.js')) ||
    existsSync(join(cwd, 'tailwind.config.ts'))
  const hasPackageJson = existsSync(join(cwd, 'package.json'))

  if (!hasPackageJson) {
    console.log(pc.red('No package.json found. Please run this in a project directory.'))
    return
  }

  // Get configuration from user
  let config = {
    componentsPath: 'src/components',
    utilsPath: 'src/utils',
    stylesPath: 'src/styles',
    installUtils: true,
  }

  if (!options.yes) {
    const response = await prompts([
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where should components be installed?',
        initial: 'src/components',
      },
      {
        type: 'text',
        name: 'utilsPath',
        message: 'Where should utilities be installed?',
        initial: 'src/utils',
      },
      {
        type: 'text',
        name: 'stylesPath',
        message: 'Where should styles be installed?',
        initial: 'src/styles',
      },
      {
        type: 'confirm',
        name: 'installUtils',
        message: 'Install utility functions (cx, isReactComponent)?',
        initial: true,
      },
    ])

    if (!response.componentsPath) {
      console.log(pc.yellow('Cancelled.'))
      return
    }

    config = response as typeof config
  }

  const spinner = ora('Setting up...').start()

  // Create directories
  mkdirSync(join(cwd, config.componentsPath), { recursive: true })
  mkdirSync(join(cwd, config.utilsPath), { recursive: true })
  mkdirSync(join(cwd, config.stylesPath), { recursive: true })

  // Copy utilities if requested
  if (config.installUtils) {
    const cxItem = getRegistryItem('cx')
    const isReactComponentItem = getRegistryItem('is-react-component')

    if (cxItem) {
      copyFiles(cxItem, {
        destPath: config.componentsPath,
        utilsPath: config.utilsPath,
        overwrite: false,
        cwd,
      })
    }

    if (isReactComponentItem) {
      copyFiles(isReactComponentItem, {
        destPath: config.componentsPath,
        utilsPath: config.utilsPath,
        overwrite: false,
        cwd,
      })
    }
  }

  // Copy globals.css
  const registryPath = getRegistryPath()
  const globalsCssSource = join(registryPath, 'styles/globals.css')
  const globalsCssDest = join(cwd, config.stylesPath, 'globals.css')

  if (existsSync(globalsCssSource) && !existsSync(globalsCssDest)) {
    const content = readFileSync(globalsCssSource, 'utf-8')
    writeFileSync(globalsCssDest, content)
  }

  spinner.succeed('Setup complete')

  // Install base dependencies
  const baseDeps = ['tailwind-merge']
  const missingDeps = getMissingDependencies(baseDeps, cwd)

  if (missingDeps.length > 0) {
    console.log()
    console.log(pc.blue(`Installing dependencies: ${missingDeps.join(', ')}`))
    await installDependencies(missingDeps, cwd)
  }

  console.log()
  console.log(pc.green('Untitled Design System initialized!'))
  console.log()
  console.log('Next steps:')
  console.log()
  console.log(`  1. ${pc.cyan('untitled-ds add button')} - Add your first component`)
  console.log(`  2. Import the component in your app`)
  console.log()

  if (!hasTailwind) {
    console.log(pc.yellow('Note: Make sure you have Tailwind CSS configured.'))
    console.log(pc.dim('See: https://tailwindcss.com/docs/installation'))
    console.log()
  }
}
