# Unified DS

A design system that keeps Figma and web applications in sync using shared design tokens.

## Rules

At the beginning of every new Claude session, connect to all the MCP Servers ourlined in .mcp.json
Read all the files in /.cursor/rules

## Project Overview

### Figma
A design system that is based on Untitled UI, a design system library that includes Design components in Figma and in React. The goal of this project is to create a design system with 1:1 parity between Figma and the code in Github. 

Components are defined in Figma in this Unified DS design file:
https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831&t=jNXjJUO6MpBO9jqT-1

### Code Components
React components powered by React Aria and Tailwind 
The goal is to have each component in Figma represented in code inside of the /components directory in this project. 

### Storybook rules

Each component should also have it's own story in Storybook. The last page in each story should be called Figma and should include a button that links back to the source component that was initially shared to kick-off the creation of a new component in the design system.

## Figma to Code workflow

Every component defined in Figma will have a 1:1 counterpart in this project. We will build this library one component at a time.

We will build this design system component by component. When I paste a link to a Figma component, use the Untitled UI CLI to find it's counterpart in it's React library. 

### Minimize complexity
Untitled UI components contain lots of code to represent many variant possibilities in the Untitled UI starter kit file. 


## Figma Design Token Workflow

This step is important because we want it to be easy for us to update the foundations of the project (the design tokens => Tailwind config) from our Figma source of truth, i.e. the Unified DS Figma file that we reference above. 

1. Open the design system file in Figma
2. Run the plugin: Plugins → Development → Variables Export
3. Click "Export Variables"
4. Copy the JSON output
5. Save to `tokens/primitives.tokens.json`
6. Run: `node scripts/build-tokens.js`
React components built with Tailwind CSS and React Aria

### Tailwind Usage

The `tailwind.config.js` is pre-configured with all design tokens:



## Project Structure

```
unified-ds/
├── CLAUDE.md                      # This file - project context for Claude
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
└── figma-tokins-plugin/                 # Figma Variables Import/Export plugin
    ├── manifest.json
    ├── code.js
    ├── export.html
    └── import.html
```

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
