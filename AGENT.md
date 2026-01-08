# Unified Design System

A design system that keeps Figma and web applications in sync using shared design tokens.

## Project Overview

This project provides:
- **Design tokens** exported from Figma in W3C Design Tokens format
- **Tailwind CSS config** generated from those tokens
- **CSS custom properties** for direct usage
- **Figma plugin** for importing/exporting variables

## API Key Management

### Centralized Secrets (Agent-Agnostic)

All API keys are stored in a single location that both Cursor and Claude Code can access:

```
~/.config/secrets/api-keys.env    # All API keys (chmod 600)
~/.zshrc                          # Sources the secrets file
~/.cursor/mcp.json                # MCP server config (reads from env)
```

**To add a new API key:**
1. Edit `~/.config/secrets/api-keys.env`
2. Add: `export NEW_API_KEY="your-key-here"`
3. Restart your terminal (or run `source ~/.zshrc`)

### Available Environment Variables

| Variable | Purpose | Used By |
|----------|---------|---------|
| `FIGMA_API_KEY` | Figma MCP server | MCP |
| `FIGMA_ACCESS_TOKEN` | Figma REST API | Scripts |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub MCP server | MCP |
| `GITHUB_TOKEN` | GitHub CLI/API | Scripts |
| `ATLASSIAN_API_TOKEN` | Jira MCP server | MCP |
| `SUPABASE_URL` | Supabase connection | Apps |
| `SUPABASE_ANON_KEY` | Supabase auth | Apps |
| `CLERK_SECRET_KEY` | Clerk auth | Apps |

### MCP Servers

Configured in `~/.cursor/mcp.json`:
| Server | Purpose |
|--------|---------|
| `figma-personal` | Figma API (personal account) |
| `figma-work` | Figma API (work account) |
| `github-personal` | GitHub API (PlayaLink) |
| `github-work` | GitHub API (jordanchghealthcare) |
| `supabase` | Supabase MCP |
| `vercel` | Vercel deployment |
| `atlassian` | Jira integration |

**MCP Usage**: When using an agent, specify which server:
> "Use figma-work to fetch the component specs"
> "Use github-work to create the PR"

### Multi-Context Figma Keys (direnv)

The Figma API key automatically switches based on project directory:

| Project | Token | Reason |
|---------|-------|--------|
| benchmarkr | Personal | Personal project |
| unified-ds | Work | Work design system |
| oneview-all-providers | Work | Work project |

**How it works:**
- Each project has a `.envrc` file that sets `FIGMA_API_KEY`
- `direnv` loads the correct key when you `cd` into the project
- Works in terminal and Cursor's integrated terminal

**Manual override** (in any terminal):
```bash
figma-personal  # Switch to personal Figma account
figma-work      # Switch to work Figma account
```

### Multi-Context GitHub Keys (direnv)

The GitHub token automatically switches based on project directory:

| Project | Account | Username |
|---------|---------|----------|
| benchmarkr | Personal | PlayaLink |
| unified-ds | Work | jordanchghealthcare |
| oneview-all-providers | Personal | PlayaLink |

**How it works:**
- Each project has a `.envrc` file that sets `GITHUB_TOKEN`
- `direnv` loads the correct token when you `cd` into the project
- Works in terminal and Cursor's integrated terminal

**Manual override** (in any terminal):
```bash
github-personal  # Switch to GitHub personal (PlayaLink)
github-work      # Switch to GitHub work (jordanchghealthcare)
```

### Project Environment Variables

For project-specific secrets (not MCP):
```bash
cp .env.example .env
# Edit .env with project-specific values
```

### Security Rules

- **NEVER** commit `.env` or `.envrc` files
- **NEVER** hardcode API keys in source code
- Centralized secrets: `~/.config/secrets/api-keys.env` (chmod 600)
- MCP config: `~/.cursor/mcp.json` (chmod 600)
- Project `.envrc` files reference env vars (don't contain actual keys)
- Production secrets: Use deployment platform's secret manager

## Project Structure

```
unified-ds/
├── AGENT.md                      # This file - project context for Claude
├── .envrc                        # direnv config (sets work tokens for Figma & GitHub)
├── .env.example                  # Template for environment variables
├── .gitignore                    # Git ignore rules
├── tailwind.config.js            # Tailwind theme from design tokens
│
├── tokens/                       # Design tokens (source of truth)
│   ├── primitives.tokens.json    # All primitive values
│   └── colors.tokens.json        # W3C format for Figma import
│
├── src/
│   └── styles/
│       └── tokens.css            # Generated CSS custom properties
│
├── scripts/
│   └── build-tokens.js           # Token build/sync script
│
└── figma-plugin/                 # Figma Variables Import/Export plugin
    ├── manifest.json
    ├── code.js
    ├── export.html
    └── import.html
```

## Design Token Workflow

### Figma → Code (Export)

1. Open the design system file in Figma
2. Run the plugin: Plugins → Development → Variables Export
3. Click "Export Variables"
4. Copy the JSON output
5. Save to `tokens/primitives.tokens.json`
6. Run: `node scripts/build-tokens.js`

### Code → Figma (Import)

1. Use `tokens/colors.tokens.json` (W3C format)
2. In Figma: Plugins → Development → Variables Export → Import Variables
3. Paste the JSON content

## Tailwind Usage

The `tailwind.config.js` is pre-configured with all design tokens:

## Commands

```bash
# Build tokens (after Figma export)
node scripts/build-tokens.js

# Install dependencies (when package.json exists)
npm install

# Start dev server (when app is set up)
npm run dev
```

## Notes for Claude

- When updating design tokens, always run `build-tokens.js` after
- The Figma plugin is in development mode - import via manifest.json
- Tailwind config and CSS variables should stay in sync with token files
- Check `.env.example` for required environment variables before running scripts that need API access
