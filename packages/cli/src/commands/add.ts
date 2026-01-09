import pc from 'picocolors'
import ora from 'ora'
import prompts from 'prompts'
import {
  getComponents,
  getRegistryItem,
  resolveWithDependencies,
} from '../lib/registry.js'
import { copyFiles } from '../lib/file-operations.js'
import {
  getMissingDependencies,
  installDependencies,
} from '../lib/dependency-manager.js'

interface AddOptions {
  path: string
  overwrite?: boolean
}

export async function add(components: string[], options: AddOptions) {
  const cwd = process.cwd()

  // Interactive mode if no components specified
  if (!components || components.length === 0) {
    const availableComponents = getComponents()

    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Select components to add',
      choices: availableComponents.map((item) => ({
        title: item.title,
        value: item.name,
        description: item.description,
      })),
      hint: '- Space to select, Enter to confirm',
    })

    if (!response.components || response.components.length === 0) {
      console.log(pc.yellow('No components selected.'))
      return
    }

    components = response.components
  }

  // Validate components exist
  const invalidComponents = components.filter((name) => !getRegistryItem(name))
  if (invalidComponents.length > 0) {
    console.log(
      pc.red(`Unknown components: ${invalidComponents.join(', ')}`)
    )
    console.log(pc.dim(`Run ${pc.cyan('untitled-ds list')} to see available components.`))
    return
  }

  // Resolve all dependencies
  const itemsToInstall = resolveWithDependencies(components)

  console.log()
  console.log(pc.bold('Adding:'))
  for (const item of itemsToInstall) {
    const type = item.type === 'utility' ? pc.dim('(utility)') : ''
    console.log(`  ${pc.cyan(item.name)} ${type}`)
  }
  console.log()

  // Copy files
  const spinner = ora('Copying files...').start()

  const allCopied: string[] = []
  const allSkipped: string[] = []

  for (const item of itemsToInstall) {
    const { copied, skipped } = copyFiles(item, {
      destPath: options.path,
      utilsPath: 'src/utils',
      overwrite: options.overwrite ?? false,
      cwd,
    })
    allCopied.push(...copied)
    allSkipped.push(...skipped)
  }

  spinner.succeed('Files copied')

  // Show what was copied
  if (allCopied.length > 0) {
    console.log()
    console.log(pc.green('Created:'))
    for (const file of allCopied) {
      const relativePath = file.replace(cwd + '/', '')
      console.log(`  ${pc.dim(relativePath)}`)
    }
  }

  if (allSkipped.length > 0) {
    console.log()
    console.log(pc.yellow('Skipped (already exist):'))
    for (const file of allSkipped) {
      const relativePath = file.replace(cwd + '/', '')
      console.log(`  ${pc.dim(relativePath)}`)
    }
    console.log(pc.dim(`  Use ${pc.cyan('--overwrite')} to replace existing files.`))
  }

  // Collect all npm dependencies
  const allDeps: string[] = []
  for (const item of itemsToInstall) {
    allDeps.push(...item.dependencies)
  }
  const uniqueDeps = [...new Set(allDeps)]

  // Install missing dependencies
  const missingDeps = getMissingDependencies(uniqueDeps, cwd)

  if (missingDeps.length > 0) {
    console.log()
    console.log(pc.blue(`Installing dependencies: ${missingDeps.join(', ')}`))
    await installDependencies(missingDeps, cwd)
  }

  console.log()
  console.log(pc.green('Done!'))
  console.log()
}
