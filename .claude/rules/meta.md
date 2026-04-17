---
description: Guidelines system for untitled-ds
---

# Guidelines System

## Where things live

- **`AGENTS.md`** — Project context: stack, commands, publishing workflow. Edit directly. (`CLAUDE.md` symlinks here.)
- **`.claude/rules/*.md`** — Always-on behavioral guidelines. Loaded into every turn's context — keep this set small. Only include rules that apply to most edits (style conventions, token usage, markup requirements).
- **`.claude/skills/*/SKILL.md`** — On-demand workflows. Loaded only when invoked (e.g., `/commit`, "add a component"). Use these for multi-step procedures that don't apply to every edit.
- **`.claude/commands/*.md`** — Thin slash-command entry points. Typically just invoke a skill.

## Rule vs skill — which is it?

Ask: "Does this apply to every edit, or only when starting a specific task?"

- **Every edit** → rule. Examples: semantic color tokens, `data-referenceid`, story structure.
- **Specific task** → skill. Examples: publishing a release, committing, adding a new component.

## When to update

Update when:
- A repeatable convention is established
- A rule or skill is wrong, outdated, or incomplete
- The user corrects behavior and the correction should persist

## How to update

- Edit existing rule/skill files or create new `kebab-case.md` files
- Edit `AGENTS.md` for project context changes
- Keep guidance concise, actionable, and example-driven
