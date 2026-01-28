# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Untitled Design System is a design system with 1:1 parity between Figma and React code. Components are based on Untitled UI and built with React Aria and Tailwind CSS 4.

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:lib        # Build library for NPM publishing
npm run build:tokens     # Regenerate CSS from Figma tokens
```

## AI Rules System

This project uses a **single source of truth** for all AI agent instructions, supporting both Cursor and Claude Code.

### Directory Structure

```
.ai-rules/                    # SOURCE OF TRUTH (edit here!)
├── global/                   # Always-applied rules
│   ├── commit-messages.md
│   ├── project-overview.md
│   └── storybook-stories.md
├── conditional/              # Path-scoped rules (via globs)
│   ├── custom-component-implementation.md
│   ├── design-tokens.md
│   ├── npm-publishing.md
│   └── untitled-ui-component.md
└── skills/                   # Reusable workflows (Claude Code)
    ├── custom-component.md
    └── untitled-ui-component.md

.cursor/rules/                # GENERATED (gitignored)
.claude/rules/                # GENERATED (gitignored)
.claude/skills/               # GENERATED (gitignored)
```

### How It Works

1. **Edit rules in `.ai-rules/`** - this is the single source of truth
2. **Run `./scripts/sync-ai-rules.sh`** - generates agent-specific files
3. **Cursor reads from `.cursor/rules/`** - auto-generated `.mdc` files
4. **Claude Code reads from `.claude/rules/`** - symlinks to `.ai-rules/`

### After Editing Rules

```bash
./scripts/sync-ai-rules.sh
```

### Rule Categories

| Category | Location | Applied When |
|----------|----------|--------------|
| Global | `.ai-rules/global/` | Always, all files |
| Conditional | `.ai-rules/conditional/` | When file matches `globs` in frontmatter |
| Skills | `.ai-rules/skills/` | On-demand workflows (Claude Code `/commands`) |

## Detailed Rules

See `.ai-rules/` for comprehensive guides:
- `global/storybook-stories.md` - Required 3-story structure, argTypes organization
- `global/commit-messages.md` - Conventional commit format
- `conditional/design-tokens.md` - Token flow, dark mode, semantic vs primitive tokens
- `conditional/untitled-ui-component.md` - Full Untitled UI component workflow
- `conditional/custom-component-implementation.md` - Simplified component workflow
- `conditional/npm-publishing.md` - Package distribution

## Commit Format

```
<type>(<scope>): <message title>

- Bullet points summarizing changes
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

**Important**: Do NOT add promotional text like "Generated with Claude Code" to commit messages
