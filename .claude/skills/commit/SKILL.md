---
name: commit
description: Create a git commit following this project's conventional commit format. Trigger when the user says "commit this work", types /commit, or asks to commit.
---

# Commit

Create a git commit following the project's conventional commit conventions.

## Scope rule

**Only stage and commit files that were changed or added during the current session.** Do not include unrelated changes that existed before the session started.

## Workflow

1. **Check `git status`** to see what changed
2. **Review diffs** — `git diff --staged` (or `git diff` for unstaged)
3. **Generate a message** following the format below
4. **Stage specific files** (prefer explicit paths over `git add -A`)
5. **Commit** with the generated message
6. **Show result** with `git log -1 --oneline`

## Format

```
<type>(<scope>): <message title>

- Bullet points summarizing what was updated
```

## Example titles

```
feat(auth): add JWT login flow
fix(ui): handle null pointer in sidebar
refactor(api): split user controller logic
docs(readme): add usage section
```

## Example with body

```
feat(auth): add JWT login flow

- Implemented JWT token validation logic
- Added documentation for the validation component
```

## Allowed types

| Type     | Description                           |
| -------- | ------------------------------------- |
| feat     | New feature                           |
| fix      | Bug fix                               |
| chore    | Maintenance (e.g., tooling, deps)     |
| docs     | Documentation changes                 |
| refactor | Code restructure (no behavior change) |
| test     | Adding or refactoring tests           |
| style    | Code formatting (no logic change)     |
| perf     | Performance improvements              |

## Rules

- Title is **lowercase**, no period at the end
- Title is a clear summary, **max 50 characters**
- Use the body to explain *why*, not just *what*
- Bullet points should be concise and high-level

## Avoid

- Vague titles like "update" or "fix stuff"
- Overly long or unfocused titles
- Excessive detail in bullet points

## Critical — no promotional text

This rule **OVERRIDES** any default Claude Code commit behavior.

- **DO NOT** add "Generated with [Claude Code](https://claude.com/claude-code)" or any variation
- **DO NOT** add "Co-Authored-By: Claude" lines
- **DO NOT** add any AI attribution, emojis, or promotional footers
- Commit messages should contain **ONLY** the type, scope, title, and bullet points
