---
description: Find and safely remove dead code, unused exports, and unused dependencies
---

# Refactor Clean

Find and safely remove dead code with build verification at each step.

## Step 1: Detect dead code

Run available analysis tools:

```bash
npx knip          # Unused exports, files, dependencies
npx depcheck      # Unused npm dependencies
```

If neither is installed, use Grep to find exports with zero imports across `src/`.

**Important:** Exports in `src/index.ts` are the public API consumed by benchmarkr. Verify against `benchmarkr/components/ds/index.ts` before removing any root export.

## Step 2: Categorize findings

| Tier | Examples | Action |
|------|----------|--------|
| **SAFE** | Unused internal utilities, unexported helpers | Delete with confidence |
| **CAUTION** | Exported components, styles, types | Verify not imported by benchmarkr |
| **DANGER** | `src/index.ts` exports, token files, config | Investigate first |

## Step 3: Safe deletion loop

For each SAFE item:

1. **Run build** — Establish baseline (`npm run build:lib` passes)
2. **Delete the dead code** — Surgical removal
3. **Re-run build** — Verify nothing broke
4. **If build fails** — Immediately revert with `git checkout -- <file>` and skip this item
5. **If build passes** — Move to next item

## Step 4: Handle CAUTION items

Before deleting exported items:
- Check if benchmarkr's `components/ds/index.ts` re-exports it
- Search benchmarkr's `components/custom/` for direct imports
- Check Storybook stories that reference the export

## Step 5: Summary

```
Dead Code Cleanup
---
Deleted:   X unused functions, Y unused files, Z unused dependencies
Skipped:   N items (build failed or consumed by benchmarkr)
Saved:     ~M lines removed
---
Build passing: YES/NO
```

## Rules

- Never delete without running build first
- One deletion at a time
- Always check benchmarkr consumption before removing public exports
- Don't refactor while cleaning — separate concerns
