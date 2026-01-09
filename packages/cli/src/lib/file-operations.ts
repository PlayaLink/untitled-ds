import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import type { RegistryItem } from './registry.js'
import { getRegistryPath } from './registry.js'

export interface CopyOptions {
  destPath: string
  utilsPath: string
  overwrite: boolean
  cwd: string
}

/**
 * Copy component/utility files to the user's project
 */
export function copyFiles(
  item: RegistryItem,
  options: CopyOptions
): { copied: string[]; skipped: string[] } {
  const copied: string[] = []
  const skipped: string[] = []
  const registryPath = getRegistryPath()

  for (const file of item.files) {
    const sourcePath = join(registryPath, file)

    // Determine destination based on file type
    let destPath: string
    if (file.startsWith('utils/')) {
      const fileName = file.replace('utils/', '')
      destPath = join(options.cwd, options.utilsPath, fileName)
    } else if (file.startsWith('components/')) {
      const relativePath = file.replace('components/', '')
      destPath = join(options.cwd, options.destPath, relativePath)
    } else {
      destPath = join(options.cwd, options.destPath, file)
    }

    // Check if file exists
    if (existsSync(destPath) && !options.overwrite) {
      skipped.push(destPath)
      continue
    }

    // Read source file
    let content = readFileSync(sourcePath, 'utf-8')

    // Transform imports to match user's path structure
    content = transformImports(content, options)

    // Ensure directory exists
    mkdirSync(dirname(destPath), { recursive: true })

    // Write file
    writeFileSync(destPath, content)
    copied.push(destPath)
  }

  return { copied, skipped }
}

/**
 * Transform @/ imports to match user's project structure
 */
function transformImports(content: string, options: CopyOptions): string {
  // Replace @/utils/ imports with the user's utils path
  // e.g., @/utils/cx -> @/lib/utils/cx or ~/utils/cx
  const utilsAlias = getUtilsAlias(options.utilsPath)

  content = content.replace(
    /@\/utils\//g,
    `${utilsAlias}/`
  )

  return content
}

/**
 * Convert utils path to import alias
 * e.g., src/utils -> @/utils, src/lib/utils -> @/lib/utils
 */
function getUtilsAlias(utilsPath: string): string {
  // Remove leading src/ if present and add @/
  const normalized = utilsPath.replace(/^src\//, '')
  return `@/${normalized}`
}

/**
 * Check if a path exists in the user's project
 */
export function pathExists(filePath: string, cwd: string): boolean {
  return existsSync(join(cwd, filePath))
}
