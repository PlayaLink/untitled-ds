import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { execa } from 'execa'

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

/**
 * Detect which package manager is being used
 */
export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'bun.lockb'))) return 'bun'
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

/**
 * Get installed dependencies from package.json
 */
export function getInstalledDependencies(cwd: string): Set<string> {
  const pkgPath = join(cwd, 'package.json')

  if (!existsSync(pkgPath)) {
    return new Set()
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

  return new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ])
}

/**
 * Install npm dependencies
 */
export async function installDependencies(
  deps: string[],
  cwd: string
): Promise<void> {
  if (deps.length === 0) return

  const pm = detectPackageManager(cwd)

  const installCmd = pm === 'npm' ? 'install' : 'add'

  await execa(pm, [installCmd, ...deps], {
    cwd,
    stdio: 'inherit',
  })
}

/**
 * Get missing dependencies that need to be installed
 */
export function getMissingDependencies(
  required: string[],
  cwd: string
): string[] {
  const installed = getInstalledDependencies(cwd)
  return required.filter((dep) => !installed.has(dep))
}
