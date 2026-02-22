---
description: Incrementally fix build and type errors with minimal, safe changes
---

# Build Fix

Incrementally fix library build errors one at a time.

## Step 1: Run the build

The library build is the primary target — this is what consumers import:

```bash
npm run build:lib
```

If tokens need regenerating first:

```bash
npm run build:tokens
```

For type-only check:

```bash
npx tsc --noEmit
```

## Step 2: Parse and group errors

1. Capture stderr output
2. Group errors by file path
3. Sort by dependency order (fix imports/types before logic errors)
4. Count total errors for progress tracking

**Note:** TS4023 warnings about Dropdown's `HeaderProps` are pre-existing and non-blocking. Ignore these.

## Step 3: Fix loop (one error at a time)

For each error:

1. **Read the file** — See error context (10 lines around the error)
2. **Diagnose** — Identify root cause (missing import, wrong type, syntax error)
3. **Fix minimally** — Smallest change that resolves the error
4. **Re-run build** — `npm run build:lib` to verify
5. **Move to next** — Continue with remaining errors

## Step 4: Guardrails

Stop and ask the user if:
- A fix introduces more errors than it resolves
- The same error persists after 3 attempts
- The fix requires architectural changes
- Errors stem from missing token generation (`npm run build:tokens`)

## Step 5: Summary

Report:
- Errors fixed (with file paths)
- Errors remaining (if any)
- New errors introduced (should be zero)

## Common untitled-ds build failures

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| TS4023 `HeaderProps` warning | Known Dropdown type export issue | Ignore — non-blocking |
| Missing CSS variable | Token not in `tokens/all-figma.tokens.json` | Re-export from Figma, run `npm run build:tokens` |
| `sortCx` type error | Style object shape mismatch | Check against existing component style patterns |
| Missing export in `src/index.ts` | New component not re-exported | Add export to `src/index.ts` |
| Tailwind class not found | Token naming (hyphens not underscores) | Run `npm run lint:tokens` to check |

Fix one error at a time. Prefer minimal diffs over refactoring.
