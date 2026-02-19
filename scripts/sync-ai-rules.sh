#!/bin/bash
# Backward compatibility shim. Use ./scripts/sync-ai-guidelines.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/sync-ai-guidelines.sh" "$@"
