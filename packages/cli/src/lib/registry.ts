import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export interface RegistryItem {
  name: string
  type: 'component' | 'utility'
  title: string
  description: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

export interface Registry {
  name: string
  version: string
  items: RegistryItem[]
}

let cachedRegistry: Registry | null = null

export function getRegistry(): Registry {
  if (cachedRegistry) return cachedRegistry

  const registryPath = join(__dirname, '../registry/registry.json')
  const content = readFileSync(registryPath, 'utf-8')
  cachedRegistry = JSON.parse(content) as Registry

  return cachedRegistry
}

export function getRegistryItem(name: string): RegistryItem | undefined {
  const registry = getRegistry()
  return registry.items.find((item) => item.name === name)
}

export function getComponents(): RegistryItem[] {
  const registry = getRegistry()
  return registry.items.filter((item) => item.type === 'component')
}

export function getUtilities(): RegistryItem[] {
  const registry = getRegistry()
  return registry.items.filter((item) => item.type === 'utility')
}

export function getRegistryPath(): string {
  return join(__dirname, '../registry')
}

/**
 * Resolve all dependencies for a list of components
 * Returns items in dependency order (dependencies first)
 */
export function resolveWithDependencies(names: string[]): RegistryItem[] {
  const result: RegistryItem[] = []
  const seen = new Set<string>()

  function addWithDeps(name: string) {
    if (seen.has(name)) return
    seen.add(name)

    const item = getRegistryItem(name)
    if (!item) return

    // Add registry dependencies first
    for (const dep of item.registryDependencies) {
      addWithDeps(dep)
    }

    result.push(item)
  }

  for (const name of names) {
    addWithDeps(name)
  }

  return result
}
