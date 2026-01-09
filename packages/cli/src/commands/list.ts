import pc from 'picocolors'
import { getComponents, getUtilities } from '../lib/registry.js'

export async function list() {
  const components = getComponents()
  const utilities = getUtilities()

  console.log()
  console.log(pc.bold('Available Components:'))
  console.log()

  for (const item of components) {
    console.log(`  ${pc.cyan(item.name.padEnd(15))} ${pc.dim(item.description)}`)
  }

  console.log()
  console.log(pc.bold('Utilities:'))
  console.log()

  for (const item of utilities) {
    console.log(`  ${pc.cyan(item.name.padEnd(15))} ${pc.dim(item.description)}`)
  }

  console.log()
  console.log(pc.dim(`Run ${pc.cyan('untitled-ds add <component>')} to add a component.`))
  console.log()
}
