#!/bin/bash
set -eo pipefail

# Setup script for the Docker sandbox used by Ralph.
# Run this ONCE before your first ralph/afk.sh run. Re-run after
# destroying the sandbox or whenever package-lock.json changes materially.
#
# What it does:
#   1. Creates (or reuses) a Docker sandbox named "claude-untitled-ds".
#   2. Installs node_modules on the VM-local overlayfs (NOT on the
#      virtiofs-mounted project path) because Docker Desktop's virtiofs
#      non-deterministically corrupts large binary files during write.
#      See ralph/DIAGNOSIS.md (if present) for the full investigation.
#   3. Symlinks ./node_modules -> /home/agent/nm-workspace/node_modules
#      so Node's resolver finds dependencies at the usual path, while the
#      actual files live on fast, reliable VM-local ext4.
#   4. Runs build:tokens, build:lib, and test to prove the install is
#      green before handing the sandbox over.
#   5. Prints authentication instructions for Claude and GitHub CLI.
#
# Tradeoff: while the sandbox is set up, the project's host-visible
# ./node_modules is a symlink pointing into the VM (dangling from the
# host's perspective). To run host-side npm commands, either delete the
# symlink and `npm install` on the host, or execute inside the sandbox:
#   ./ralph/sbx.sh npm run <script>

SANDBOX_NAME="claude-untitled-ds"
PROJECT_DIR="/Users/jengland/claude/untitled-ds"
# VM-local directory that will hold the real node_modules tree.
# Lives on overlayfs root, not on virtiofs, so extraction is reliable.
VM_NM_DIR="/home/agent/nm-workspace"

echo "=== Ralph Sandbox Setup ==="
echo ""

if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed. Install Docker Desktop first."
  exit 1
fi

if docker sandbox ls 2>/dev/null | grep -q "$SANDBOX_NAME"; then
  echo "Sandbox '$SANDBOX_NAME' already exists. Reusing it."
else
  echo "Creating sandbox '$SANDBOX_NAME'..."
  docker sandbox create --name "$SANDBOX_NAME" claude "$PROJECT_DIR"
fi

sbx() {
  docker sandbox exec -w "$PROJECT_DIR" "$SANDBOX_NAME" bash -eo pipefail -c "$1"
}

echo "Clearing any existing ./node_modules (real dir or stale symlink)..."
sbx "rm -rf node_modules"

echo "Installing dependencies in VM-local path ($VM_NM_DIR)..."
# Retry install up to 3 times. The sandbox -> npm registry path through
# Docker Desktop is prone to transient ECONNRESET on large installs.
sbx "
  mkdir -p '$VM_NM_DIR'
  cp package.json package-lock.json '$VM_NM_DIR/'
  cd '$VM_NM_DIR'
  for attempt in 1 2 3; do
    if npm install --no-audit --no-fund --fetch-retries=5 --fetch-retry-mintimeout=5000; then
      break
    fi
    if [ \$attempt -eq 3 ]; then
      echo 'npm install failed 3 times -- aborting setup.' >&2
      exit 1
    fi
    echo \"npm install attempt \$attempt failed, retrying...\" >&2
    sleep 3
  done
  test -x node_modules/.bin/vite
  test -x node_modules/.bin/vitest
"

echo "Symlinking project node_modules -> $VM_NM_DIR/node_modules..."
sbx "ln -s '$VM_NM_DIR/node_modules' node_modules && ls -la node_modules"

echo ""
echo "=== In-sandbox verification ==="
# build:tokens + build:lib passing proves the native binaries
# (esbuild, rollup, @tailwindcss/oxide) are healthy. Hard-fail if either
# errors -- that's the signal the install is broken.
sbx "npm run build:tokens 2>&1 | tail -3"
sbx "npm run build:lib 2>&1 | tail -5"
# test is advisory: vitest uses esbuild, so reaching the test-runner
# startup at all proves the native-binary layer works. Pre-existing
# test failures don't signal a broken sandbox -- let Ralph fix those
# in-loop via the restored feedback loop in ralph/prompt.md.
echo ""
echo "Running test suite (advisory; failures do not block setup)..."
if ! sbx "npm run test 2>&1 | tail -8"; then
  echo ""
  echo "⚠  Pre-existing test failures detected. Sandbox is still usable;"
  echo "   Ralph will run tests in-loop and fix regressions it introduces."
fi

echo ""
echo "=== Authentication ==="
echo "Two tools need authentication inside the sandbox:"
echo ""
echo "1. Claude Code CLI:"
echo "   docker sandbox exec -it $SANDBOX_NAME claude /login"
echo ""
echo "2. GitHub CLI:"
echo "   docker sandbox exec -it $SANDBOX_NAME gh auth login"
echo ""
echo "After authenticating both, verify with:"
echo "   docker sandbox exec $SANDBOX_NAME claude --print 'Say hello'"
echo "   docker sandbox exec $SANDBOX_NAME gh auth status"
echo ""
echo "=== Setup Complete ==="
echo "You can now run: ./ralph/afk.sh <iterations>"
echo ""
echo "Note: ./node_modules is a symlink to a VM-local path. Host-side"
echo "npm scripts will not work until you delete the symlink and run"
echo "'npm install' on the host. Prefer './ralph/sbx.sh npm run <script>'"
echo "to execute inside the sandbox."
