---
description: NPM package distribution and publishing workflow
globs:
  - "**/package.json"
  - "**/dist/**"
---

# NPM Package Distribution

This design system is distributed as an NPM package via **GitHub Packages** (not public npm).

## Publishing a New Version

### Automated (preferred)

Pushing a git tag triggers GitHub Actions to build and publish automatically:

```bash
# 1. Build the library to verify it compiles
npm run build:lib

# 2. Bump version
npm version patch  # or minor/major (this commits + creates tag)

# 3. Push commit and tag — CI publishes to GitHub Packages
git push && git push --tags
```

### Manual (if CI is unavailable)

```bash
# 1. Build the library
npm run build:lib

# 2. Bump version (--no-git-tag-version if you want to commit separately)
npm version patch

# 3. Publish directly (requires ~/.npmrc with GitHub Packages auth token)
npm publish

# 4. Commit, tag, and push
git add package.json package-lock.json
git commit -m "chore(release): v$(node -p 'require(\"./package.json\").version')"
git tag "v$(node -p 'require('./package.json').version')"
git push && git push --tags
```

### Authentication

Publishing requires a GitHub PAT with `write:packages` scope, configured in `~/.npmrc`:

```
//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE
```

### TS4023 Warnings

The build emits TS4023 warnings about Dropdown's `HeaderProps` — these are pre-existing and non-blocking. The package publishes correctly.

## When to Publish

**You MUST publish a new version when:**
- New components or exports are added that benchmarkr (or any consumer) references
- Existing component APIs change (props renamed/removed)
- Bug fixes that affect consumer behavior

**Vercel builds will fail** if benchmarkr's `components/ds/index.ts` re-exports something that doesn't exist in the published version. Locally this is masked by `npm link`.

## Consumer Setup

### .npmrc (required in consumer repo)

```
@playalink:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

The `${NPM_TOKEN}` env var is resolved at install time:
- **Locally**: falls through to `~/.npmrc` which has the token hardcoded
- **Vercel/CI**: set `NPM_TOKEN` as an environment variable

### CSS Setup

```css
@import 'tailwindcss';
@config '@playalink/untitled-ds/tailwind.config';
@import '@playalink/untitled-ds/styles/tokens';
@import '@playalink/untitled-ds/styles/globals';
@source 'node_modules/@playalink/untitled-ds/dist/**/*.js';
```

### Component Usage

```typescript
import { Button, Badge, Tag, ButtonGroup } from '@playalink/untitled-ds'
```
