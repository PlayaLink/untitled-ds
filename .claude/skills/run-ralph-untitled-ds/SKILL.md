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
cd ~/claude/untitled-ds
./ralph/setup-sandbox.sh
```

**3. Authenticate Claude and GitHub inside the sandbox:**

```bash
docker sandbox exec -it claude-untitled-ds claude /login
docker sandbox exec -it claude-untitled-ds gh auth login
```

**4. Verify both are working:**

```bash
docker sandbox exec claude-untitled-ds claude --print 'Say hello'
docker sandbox exec claude-untitled-ds gh auth status
```

---

## AFK Mode (fully autonomous)

Runs Claude inside the Docker sandbox, working through open GitHub issues one at a time.

```bash
cd ~/claude/untitled-ds
./ralph/afk.sh <iterations>
```

Example — run 5 iterations:

```bash
./ralph/afk.sh 5
```

The loop exits early if Claude reports `NO MORE TASKS`.

---

## Recreating the Sandbox

If the sandbox gets into a bad state (dependency errors, stale node_modules), destroy and recreate it:

```bash
docker sandbox rm claude-untitled-ds
./ralph/setup-sandbox.sh
```

The `.dockerignore` ensures the sandbox installs its own Linux-native dependencies — the host's `node_modules` is never copied in.

---

## HITL Mode (single issue, interactive)

Runs Claude locally (no Docker) on a specific GitHub issue. Claude asks permission before each action.

```bash
cd ~/claude/untitled-ds
./ralph/once.sh <issue-number>
```

Example — work on issue #42:

```bash
./ralph/once.sh 42
```
