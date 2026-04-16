#!/bin/bash

# Run a single Ralph iteration in human-in-the-loop mode (no Docker sandbox).
# Claude will ask for permission before running commands.

if [ -z "$1" ]; then
  echo "Usage: ./ralph/once.sh <issue-number>"
  echo "  Pass an issue number to work on a specific issue"
  echo ""
  echo "Example: ./ralph/once.sh 42"
  exit 1
fi

commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found")
issue=$(gh issue view "$1" --json number,title,body,comments)
prompt=$(cat ralph/prompt.md)

claude --permission-mode acceptEdits \
  "Previous commits: $commits GitHub Issue: $issue $prompt"
