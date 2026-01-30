#!/bin/bash

# Check for incorrect token naming patterns in component files
# Tokens should use hyphens (bg-secondary-alt) not underscores (bg-secondary_alt)
#
# Usage: ./scripts/check-token-naming.sh
# Add to CI or run before commits to catch token naming issues early

set -e

ERRORS_FOUND=0

echo "Checking for incorrect token naming patterns..."
echo ""

# Patterns that indicate underscore usage where hyphens are expected
# These are common mistakes when writing Tailwind classes for design tokens
PATTERNS=(
    "_alt"           # bg-secondary_alt should be bg-secondary-alt
    "_hover"         # bg-primary_hover should be bg-primary-hover
    "_solid"         # bg-secondary_solid should be bg-secondary-solid
    "_subtle"        # bg-secondary_subtle should be bg-secondary-subtle
    # Ring patterns - need border- prefix for semantic colors
    # Exclude: ring-inset, ring-1, ring-2, ring-offset-*, shadow-focus-ring-*
    '"ring-primary '    # ring-primary should be ring-border-primary (quoted, followed by space)
    '"ring-secondary '  # ring-secondary should be ring-border-secondary
    ' ring-primary '    # ring-primary in middle of class string
    ' ring-secondary '  # ring-secondary in middle of class string
)

# Files to check
FILES=$(find src/components -name "*.tsx" -o -name "*.ts" | grep -v "\.stories\." | grep -v "\.test\.")

for pattern in "${PATTERNS[@]}"; do
    # Use grep to find matches
    MATCHES=$(grep -rn "$pattern" $FILES 2>/dev/null || true)

    if [ -n "$MATCHES" ]; then
        echo "❌ Found incorrect pattern: $pattern"
        echo "$MATCHES" | while read -r line; do
            echo "   $line"
        done
        echo ""
        ERRORS_FOUND=1
    fi
done

if [ $ERRORS_FOUND -eq 1 ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Token naming issues found!"
    echo ""
    echo "Common fixes:"
    echo "  • bg-secondary_alt  →  bg-secondary-alt   (use hyphens)"
    echo "  • bg-primary_hover  →  bg-primary-hover   (use hyphens)"
    echo "  • ring-secondary    →  ring-border-secondary (add border- prefix)"
    echo "  • ring-primary      →  ring-border-primary   (add border- prefix)"
    echo ""
    echo "See .ai-rules/conditional/design-tokens.md for the full token reference."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
else
    echo "✅ No token naming issues found"
fi
