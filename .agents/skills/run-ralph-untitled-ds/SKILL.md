---
name: run-ralph-untitled-ds
description: Display step-by-step instructions for running the Ralph autonomous coding loop in untitled-ds. Use when user says "run ralph", "ralph instructions", or invokes /run-ralph-untitled-ds.
---

# Run Ralph (untitled-ds)

Print the following instructions exactly as shown, then stop. Do not execute any of these commands.

---

## First-Time Setup

Run these once before your first Ralph run.

**1. Make sure Docker Desktop is running.**

**2. Create the Docker sandbox and install dependencies:**

```bash
cd ~/Codex/untitled-ds
./ralph/setup-sandbox.sh
```

**3. Authenticate Codex and GitHub inside the sandbox:**

```bash
docker sandbox exec -it Codex-untitled-ds Codex /login
docker sandbox exec -it Codex-untitled-ds gh auth login
```

**4. Verify both are working:**

```bash
docker sandbox exec Codex-untitled-ds Codex --print 'Say hello'
docker sandbox exec Codex-untitled-ds gh auth status
```

---

## AFK Mode (fully autonomous)

Runs Codex inside the Docker sandbox, working through open GitHub issues one at a time.

```bash
cd ~/Codex/untitled-ds
./ralph/afk.sh <iterations>
```

Example — run 5 iterations:

```bash
./ralph/afk.sh 5
```

The loop exits early if Codex reports `NO MORE TASKS`.

---

## Recreating the Sandbox

If the sandbox gets into a bad state (dependency errors, segfaults from
esbuild/rollup/@tailwindcss/oxide, "illegal instruction"), destroy and
recreate it:

```bash
docker sandbox rm Codex-untitled-ds
./ralph/setup-sandbox.sh
```

`setup-sandbox.sh` installs `node_modules` to a VM-local path
(`/home/agent/nm-workspace/node_modules`) and symlinks `./node_modules`
to it. This avoids a Docker Desktop virtiofs write-corruption bug that
otherwise silently corrupts large native binaries during install.

The script runs `npm run build:tokens` and `npm run build:lib` as
pass/fail gates at the end of setup — those two together exercise every
precompiled native binary in the install (esbuild, rollup,
@tailwindcss/oxide), so a sandbox that passes them is guaranteed healthy.
`npm run test` runs as an advisory step; pre-existing test failures don't
block setup because Ralph fixes those in-loop.

### Host impact

While the sandbox is set up, the project's host-visible `./node_modules` is
a symlink pointing into the VM. From the host, it is a dangling symlink —
host-side `npm run dev`, `npm run test`, and IDE features that need
`node_modules` will not resolve.

Options:

- Run host commands inside the sandbox instead: `./ralph/sbx.sh npm run <script>`
- Or delete the symlink and `npm install` on the host, then re-run
  `./ralph/setup-sandbox.sh` if you want the sandbox back.

## Native-binary errors inside the sandbox

If Codex reports a native-addon error during a feedback loop
(`NODE_MODULE_VERSION` mismatch, etc.) it will invoke the
`sandbox-native-rebuild` skill, which runs `npm rebuild`. That skill only
covers node-gyp / C++ addons (e.g. `better-sqlite3`, `sharp`).

If the error comes from a precompiled binary (`esbuild`, `@rollup/rollup-*`,
`@tailwindcss/oxide-*`) the sandbox install is corrupt — recreate it.

---

## HITL Mode (single issue, interactive)

Runs Codex locally (no Docker) on a specific GitHub issue. Codex asks permission before each action.

```bash
cd ~/Codex/untitled-ds
./ralph/once.sh <issue-number>
```

Example — work on issue #42:

```bash
./ralph/once.sh 42
```
