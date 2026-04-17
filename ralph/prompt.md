# ISSUES

GitHub issues are provided at start of context. Parse them to understand open tasks, their bodies, and comments.

You've also been passed recent commits. Review these to understand what work has been done.

If all tasks are complete, output <promise>NO MORE TASKS</promise>.

# TASK SELECTION

Pick the next task. Prioritize in this order:

1. Critical bugfixes (broken components, build failures)
2. Development infrastructure (tests, token linting, build scripts)
3. New components pulled from Untitled UI or Figma (follow `.claude/skills/untitled-ui-component/SKILL.md`)
4. Polish and quick wins (stories, JSDoc parity notes, semantic token cleanup)
5. Refactors

Skip any issue labeled HITL or that requires human decision-making (architectural choices, design reviews, visual approvals against Figma). Only work on AFK-suitable tasks.

# EXPLORATION

Explore the repo. Read CLAUDE.md (symlinked to AGENTS.md) and .claude/rules/ to understand conventions. Key references:

- `.claude/skills/untitled-ui-component/SKILL.md` — the 8-step workflow for adding components
- `.claude/rules/storybook-stories.md` — required 3-story structure (Overview, Props, SourceCodeAndDesign)
- `.claude/rules/design-tokens.md` — semantic tokens vs primitives, dark mode
- `.claude/rules/semantic-tagging.md` — `data-referenceid` requirements
- `.claude/skills/commit/SKILL.md` — conventional commit format, NO AI attribution

# IMPLEMENTATION

Complete the task. Follow all project conventions from CLAUDE.md and .claude/rules/.

Key constraints:

- Never import `@untitledui/icons` directly — use `createIcon('name', 'size')` from `@/components/icon`
- Use semantic color tokens (`text-primary`, `bg-secondary`) not primitive grays for dark mode support
- Class merging uses `cx()` from `@/utils/cx`; style variants use the `sortCx()` pattern
- Include `data-referenceid` (static, hyphenated strings) on interactive and structural elements
- Every component needs three Storybook stories: Overview, Props (with working `args` + `argTypes`), SourceCodeAndDesign
- Enhance base components with optional props rather than creating variant components

# FEEDBACK LOOPS

Before committing, run the feedback loops and fix any failures:

- `npm run lint` — token-naming checks (pure shell)
- `npm run test` — Vitest component and utility tests
- `npm run build:lib` — Vite library build

If any of these fail with a native-binary error from a node-gyp/C++ addon
(`NODE_MODULE_VERSION` mismatch, "compiled against a different Node.js
version", "invalid ELF header"), invoke the `sandbox-native-rebuild` skill
and retry.

If a precompiled binary like `esbuild`, `@rollup/rollup-*`, or
`@tailwindcss/oxide-*` segfaults or reports "illegal instruction", the
sandbox install itself is corrupt — stop and tell the user to re-run
`./ralph/setup-sandbox.sh` from the host. Do not attempt to patch.

Do not commit if feedback loops are red.

# COMMIT

Make a git commit. Follow the conventional commit format from `.claude/skills/commit/SKILL.md`:

```
type(scope): message title

- Key decisions made
- Files changed
- Blockers or notes for next iteration
```

Do NOT add Co-Authored-By lines or AI attribution.

# THE ISSUE

If the task is complete, close the original GitHub issue.

If the task is not complete, leave a comment on the GitHub issue describing what was done and what remains.

# FINAL RULES

ONLY WORK ON A SINGLE TASK.
