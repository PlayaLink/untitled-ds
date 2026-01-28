#!/bin/bash
#
# sync-ai-rules.sh
# Delegates to the parent jordan-os sync script.
# This allows running from within the project directory.
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
JORDAN_OS_DIR="$(dirname "$PROJECT_DIR")"

exec "$JORDAN_OS_DIR/.ai-rules/sync-ai-rules.sh"
