---
name: untitled-ui-component
description: Create a component using the full Untitled UI design - keeping ALL functionality
---

# Create Untitled UI Component

Create a component using the **full Untitled UI design** - keeping ALL functionality from the CLI import.

## Figma URL

$ARGUMENTS

## Instructions

1. **Read the project rules** before starting:
   - `.ai-rules/conditional/untitled-ui-component.md` - Untitled UI component workflow
   - `.ai-rules/global/storybook-stories.md` - Storybook stories guidelines

2. **Follow the untitled-ui-component.md workflow exactly:**
   - Import from Untitled UI CLI: `npx untitledui@latest add <name> --path src/components --overwrite`
   - **Keep ALL functionality** from the import - do NOT remove features
   - Update import paths to use `@/utils/cx` and `@/utils/is-react-component`
   - Add documentation header with Figma link
   - Apply the sortCx pattern for styles
   - Export from index files

3. **Follow the storybook-stories.md guidelines exactly:**
   - Create all 3 required stories (Overview, Props, SourceCodeAndDesign)
   - Show ALL variants in Overview (not just Figma variants)
   - Organize argTypes by category

4. **Run Storybook** to verify the implementation

## When to Use

- Figma component uses standard Untitled UI variants
- You want the full feature set from Untitled UI
- No simplification or customization is needed
