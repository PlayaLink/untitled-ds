#!/bin/bash
#
# sync-ai-guidelines.sh
# Delegates to the workspace ai-guidelines sync script.
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
WORKSPACE_DIR="$(dirname "$PROJECT_DIR")"

exec "$WORKSPACE_DIR/.ai-guidelines/sync.sh" "$@"
