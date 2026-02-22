#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const recast = require('recast')
const parser = require('recast/parsers/babel-ts')

const { visit, namedTypes: n, builders: b } = recast.types

const projectRoot = process.cwd()
const srcDir = path.join(projectRoot, 'src', 'components')

const WRAPPER_NODE_TYPES = new Set([
  'ParenthesizedExpression',
  'TSAsExpression',
  'TSTypeAssertion',
  'TSNonNullExpression',
])

function isPascalCase(value) {
  return /^[A-Z][A-Za-z0-9]*$/.test(value)
}

function getJsxAttribute(openingElement, attributeName) {
  for (const attr of openingElement.attributes ?? []) {
    if (!n.JSXAttribute.check(attr)) continue
    if (!n.JSXIdentifier.check(attr.name)) continue
    if (attr.name.name === attributeName) return attr
  }
  return null
}

function getStringAttributeValue(attribute) {
  if (!attribute?.value) return null
  if (n.StringLiteral.check(attribute.value)) return attribute.value.value
  if (n.Literal.check(attribute.value) && typeof attribute.value.value === 'string') return attribute.value.value
  return null
}

function setStaticAttribute(openingElement, attributeName, value) {
  const existing = getJsxAttribute(openingElement, attributeName)
  if (existing) {
    const current = getStringAttributeValue(existing)
    if (current === value) return false
    existing.value = b.stringLiteral(value)
    return true
  }

  openingElement.attributes.push(b.jsxAttribute(b.jsxIdentifier(attributeName), b.stringLiteral(value)))
  return true
}

function removeTrackedAttributes(openingElement) {
  const originalLength = openingElement.attributes.length
  openingElement.attributes = openingElement.attributes.filter((attr) => {
    if (!n.JSXAttribute.check(attr)) return true
    if (!n.JSXIdentifier.check(attr.name)) return true
    return !(
      attr.name.name === 'data-component' ||
      attr.name.name === 'data-referenceid' ||
      attr.name.name === 'data-untitled-ds'
    )
  })
  return openingElement.attributes.length !== originalLength
}

function unwrapPath(exprPath) {
  let current = exprPath
  while (current?.node && WRAPPER_NODE_TYPES.has(current.node.type)) {
    current = current.get('expression')
  }
  return current
}

function collectRootOpenings(exprPath, out) {
  const unwrapped = unwrapPath(exprPath)
  if (!unwrapped?.node) return

  const node = unwrapped.node
  if (n.JSXElement.check(node)) {
    out.push(unwrapped.get('openingElement'))
    return
  }

  if (n.JSXFragment.check(node)) {
    const childrenPath = unwrapped.get('children')
    for (let idx = 0; idx < childrenPath.value.length; idx += 1) {
      const childPath = childrenPath.get(idx)
      if (n.JSXElement.check(childPath.node)) {
        out.push(childPath.get('openingElement'))
      }
    }
    return
  }

  if (n.ConditionalExpression.check(node)) {
    collectRootOpenings(unwrapped.get('consequent'), out)
    collectRootOpenings(unwrapped.get('alternate'), out)
    return
  }

  if (n.LogicalExpression.check(node)) {
    collectRootOpenings(unwrapped.get('left'), out)
    collectRootOpenings(unwrapped.get('right'), out)
    return
  }

  if (n.SequenceExpression.check(node)) {
    const expressions = unwrapped.get('expressions')
    if (expressions.value?.length) {
      collectRootOpenings(expressions.get(expressions.value.length - 1), out)
    }
  }
}

function collectReturnRootOpenings(componentPath) {
  const result = []

  if (n.ArrowFunctionExpression.check(componentPath.node) && !n.BlockStatement.check(componentPath.node.body)) {
    collectRootOpenings(componentPath.get('body'), result)
    return result
  }

  const bodyPath = componentPath.get('body')
  visit(bodyPath, {
    visitFunction() {
      return false
    },
    visitReturnStatement(returnPath) {
      if (returnPath.node.argument) {
        collectRootOpenings(returnPath.get('argument'), result)
      }
      return false
    },
  })

  return result
}

function hasJsxInFunction(functionNode) {
  let found = false

  if (n.ArrowFunctionExpression.check(functionNode) && !n.BlockStatement.check(functionNode.body)) {
    const body = functionNode.body
    return n.JSXElement.check(body) || n.JSXFragment.check(body)
  }

  visit(functionNode.body, {
    visitFunction() {
      return false
    },
    visitJSXElement() {
      found = true
      return false
    },
    visitJSXFragment() {
      found = true
      return false
    },
  })

  return found
}

function isTopLevelPath(pathRef) {
  let curr = pathRef.parentPath
  while (curr) {
    const type = curr.node?.type
    if (type === 'Program') return true
    if (
      type === 'FunctionDeclaration' ||
      type === 'FunctionExpression' ||
      type === 'ArrowFunctionExpression' ||
      type === 'ClassMethod' ||
      type === 'ObjectMethod'
    ) {
      return false
    }
    curr = curr.parentPath
  }
  return false
}

function collectTopLevelComponents(ast) {
  const components = []

  visit(ast, {
    visitFunctionDeclaration(pathRef) {
      const name = pathRef.node.id?.name
      if (name && isPascalCase(name) && isTopLevelPath(pathRef) && hasJsxInFunction(pathRef.node)) {
        components.push({ name, functionPath: pathRef })
      }
      return false
    },
    visitVariableDeclarator(pathRef) {
      if (!isTopLevelPath(pathRef)) {
        return false
      }

      if (!n.Identifier.check(pathRef.node.id)) {
        return false
      }

      const name = pathRef.node.id.name
      if (!isPascalCase(name)) {
        return false
      }

      const initPath = pathRef.get('init')
      if (!initPath?.node) {
        return false
      }

      if (!(n.ArrowFunctionExpression.check(initPath.node) || n.FunctionExpression.check(initPath.node))) {
        return false
      }

      if (!hasJsxInFunction(initPath.node)) {
        return false
      }

      components.push({ name, functionPath: initPath })
      return false
    },
  })

  components.sort((a, b) => (a.functionPath.node.start ?? 0) - (b.functionPath.node.start ?? 0))
  return components
}

function listTsxFiles(dir) {
  const output = []

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (!entry.isFile()) continue
      if (!entry.name.endsWith('.tsx')) continue
      if (entry.name.endsWith('.stories.tsx')) continue

      output.push(fullPath)
    }
  }

  walk(dir)
  return output
}

const files = listTsxFiles(srcDir)
let changedFiles = 0

for (const filePath of files) {
  const source = fs.readFileSync(filePath, 'utf8')
  const ast = recast.parse(source, { parser })
  const components = collectTopLevelComponents(ast)

  let fileChanged = false

  visit(ast, {
    visitJSXOpeningElement(pathRef) {
      const wasUpdated = removeTrackedAttributes(pathRef.node)
      fileChanged = wasUpdated || fileChanged
      this.traverse(pathRef)
    },
  })

  for (const component of components) {
    const rootOpenings = collectReturnRootOpenings(component.functionPath)

    const seenRoots = new Set()
    for (const openingPath of rootOpenings) {
      const key = `${openingPath.node.start ?? 'na'}:${openingPath.node.end ?? 'na'}`
      if (seenRoots.has(key)) continue
      seenRoots.add(key)
      fileChanged = setStaticAttribute(openingPath.node, 'data-untitled-ds', component.name) || fileChanged
    }
  }

  if (!fileChanged) continue

  const output = recast.print(ast, { quote: 'single', trailingComma: true }).code
  if (output !== source) {
    fs.writeFileSync(filePath, output)
    changedFiles += 1
  }
}

console.log(`Updated ${changedFiles} files out of ${files.length}`)
