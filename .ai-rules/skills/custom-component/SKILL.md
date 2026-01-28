---
name: custom-component
description: Create a component that matches your Figma design - stripping features not present
---

# Create Custom Component

Create a component that **matches your Figma design** - stripping features not present in your design.

## Figma URL

$ARGUMENTS

## Instructions

1. **Read the project rules** before starting:
   - `.ai-rules/conditional/custom-component-implementation.md` - Custom component workflow
   - `.ai-rules/global/storybook-stories.md` - Storybook stories guidelines

2. **Parse the Figma URL** to extract the fileKey and nodeId

3. **Fetch Figma data** using the Figma MCP tool (`get_figma_data`)

4. **Follow the custom-component-implementation.md workflow exactly:**
   - Import from Untitled UI CLI as starting point
   - **Simplify to match Figma 1:1** - remove variants, props, and sizes not in Figma
   - Update import paths to use `@/utils/cx` and `@/utils/is-react-component`
   - Add documentation header with Figma link
   - Apply the sortCx pattern with only Figma variants
   - Export from index files

5. **Follow the storybook-stories.md guidelines exactly:**
   - Create all 3 required stories (Overview, Props, SourceCodeAndDesign)
   - Show ONLY variants that exist in your Figma
   - Organize argTypes by category

6. **Run Storybook** to verify the implementation

## When to Use

- Figma component has been customized or simplified from Untitled UI
- Only certain variants/sizes are needed
- Design system has diverged from standard Untitled UI
