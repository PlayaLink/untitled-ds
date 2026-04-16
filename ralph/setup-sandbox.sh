#!/bin/bash
set -eo pipefail

# Setup script for the Docker sandbox used by Ralph.
# Run this ONCE before your first ralph/afk.sh run.
#
# What it does:
#   1. Creates (or reuses) a Docker sandbox named "claude-untitled-ds"
#   2. Installs Linux-native node_modules inside the sandbox
#   3. Builds tokens, runs tests, and builds the library to verify the environment
#   4. Prompts you to authenticate Claude and GitHub CLI
#
# The sandbox is a persistent Linux VM. Dependencies install once and survive
# across `docker sandbox run` invocations. The .dockerignore file excludes
# the host's node_modules so the sandbox gets its own Linux-native copies.
#
# Prerequisites:
#   - Docker Desktop running with sandbox support

SANDBOX_NAME="claude-untitled-ds"
PROJECT_DIR="/Users/jengland/claude/untitled-ds"

echo "=== Ralph Sandbox Setup ==="
echo ""

# Check prerequisites
if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed. Install Docker Desktop first."
  exit 1
fi

# Check if sandbox already exists
if docker sandbox ls 2>/dev/null | grep -q "$SANDBOX_NAME"; then
  echo "Sandbox '$SANDBOX_NAME' already exists. Reusing it."
else
  echo "Creating sandbox '$SANDBOX_NAME'..."
  docker sandbox create --name "$SANDBOX_NAME" claude "$PROJECT_DIR"
fi

# Install Linux-native dependencies inside the sandbox
echo "Installing dependencies..."
docker sandbox exec -w "$PROJECT_DIR" "$SANDBOX_NAME" \
  bash -c "npm install 2>&1 | tail -5"

# Build design tokens (needed for library build)
echo "Building design tokens..."
docker sandbox exec -w "$PROJECT_DIR" "$SANDBOX_NAME" \
  bash -c "npm run build:tokens 2>&1 | tail -3"

# Verify the environment
echo ""
echo "Verifying sandbox environment..."
echo "Running tests..."
docker sandbox exec -w "$PROJECT_DIR" "$SANDBOX_NAME" \
  bash -c "npm run test 2>&1 | tail -5"
echo "Running library build..."
docker sandbox exec -w "$PROJECT_DIR" "$SANDBOX_NAME" \
  bash -c "npm run build:lib 2>&1 | tail -5"

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
