---
description: Guidelines system for untitled-ds
---

# Guidelines System

## Where Things Live

- **`CLAUDE.md`** — Project context: stack, commands, publishing workflow. Edit directly.
- **`.claude/rules/*.md`** — Behavioral guidelines: conventions, patterns, workflows. Edit directly.
- **`.claude/skills/*/SKILL.md`** — Reusable domain knowledge loaded on demand.

## When to Update

Update rules when:
- A repeatable convention is established
- A rule is wrong, outdated, or incomplete
- The user corrects behavior and the correction should persist

## How to Update

- Edit existing rule files in `.claude/rules/` or create new `kebab-case.md` files
- Edit `CLAUDE.md` for project context changes
- Keep rules concise, actionable, and example-driven
