#!/bin/bash
set -eo pipefail

# Ralph AFK loop — runs Claude autonomously inside a Docker sandbox,
# working through GitHub issues one at a time until the backlog is clear.
#
# Prerequisites:
#   - Run ./ralph/setup-sandbox.sh first (one-time setup)
#   - GitHub issues exist in the repo
#
# Usage: ./ralph/afk.sh <iterations>

SANDBOX_NAME="claude-untitled-ds"

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  echo "Example: ./ralph/afk.sh 5"
  exit 1
fi

# Verify sandbox exists
if ! docker sandbox ls 2>/dev/null | grep -q "$SANDBOX_NAME"; then
  echo "Error: Sandbox '$SANDBOX_NAME' not found."
  echo "Run ./ralph/setup-sandbox.sh first."
  exit 1
fi

# jq filter to extract streaming text from assistant messages
stream_text='select(.type == "assistant").message.content[]? | select(.type == "text").text // empty | gsub("\n"; "\r\n") | . + "\r\n\n"'

# jq filter to extract final result
final_result='select(.type == "result").result // empty'

for ((i=1; i<=$1; i++)); do
  echo ""
  echo "================================================"
  echo "  Ralph iteration $i of $1"
  echo "================================================"
  echo ""

  tmpfile=$(mktemp)
  trap "rm -f $tmpfile" EXIT

  # Gather context from the HOST (where git and gh are authenticated)
  commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found")
  issues=$(gh issue list --state open --json number,title,body,comments)
  prompt=$(cat ralph/prompt.md)

  # Run Claude inside the pre-configured sandbox
  docker sandbox run "$SANDBOX_NAME" -- \
    --verbose \
    --print \
    --output-format stream-json \
    "Previous commits: $commits GitHub Issues: $issues $prompt" \
  | grep --line-buffered '^{' \
  | tee "$tmpfile" \
  | jq --unbuffered -rj "$stream_text"

  result=$(jq -r "$final_result" "$tmpfile")

  if [[ "$result" == *"<promise>NO MORE TASKS</promise>"* ]]; then
    echo ""
    echo "Ralph complete after $i iterations."
    exit 0
  fi
done

echo ""
echo "Ralph finished $1 iterations."
