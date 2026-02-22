---
description: Run pre-push verification checks on the codebase
---

# Verify

Run verification checks and report readiness to push.

## Checks (run in order, stop on first failure)

1. **Library build** — `npm run build:lib`
2. **Token lint** — `npm run lint:tokens` (check naming conventions)
3. **Console.log audit** — Search `src/` for `console.log` (exclude stories, node_modules)
4. **Storybook build** — `npm run build` (optional, slower — skip with `quick` mode)
5. **Git status** — Show uncommitted changes and unpushed commits

## Output format

```
VERIFICATION: [PASS/FAIL]

Build:lib:  [OK/FAIL]
Tokens:     [OK/X naming issues]
Logs:       [OK/X console.logs found]
Storybook:  [OK/FAIL/SKIPPED]
Git:        [clean/X uncommitted files]

Ready to push: [YES/NO]
```

If any issues found, list them with fix suggestions.

## Arguments

$ARGUMENTS can be:
- `quick` — Library build + token lint only
- `full` — All checks (default)
- `pre-publish` — All checks plus verify `dist/` exports match `src/index.ts`
