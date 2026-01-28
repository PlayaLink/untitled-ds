#!/bin/bash
#
# sync-ai-rules.sh
# Syncs .ai-rules/ (single source of truth) to both:
#   - .cursor/rules/ (for Cursor)
#   - .claude/rules/ (for Claude Code)
#   - .claude/skills/ (for Claude Code skills)
#
# Run this after editing any files in .ai-rules/
#

set -e

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Directories
AI_RULES_DIR="$PROJECT_ROOT/.ai-rules"
CURSOR_RULES_DIR="$PROJECT_ROOT/.cursor/rules"
CLAUDE_RULES_DIR="$PROJECT_ROOT/.claude/rules"
CLAUDE_SKILLS_DIR="$PROJECT_ROOT/.claude/skills"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "🔄 Syncing AI rules from .ai-rules/ to agent-specific directories..."
echo ""

# Check if .ai-rules exists
if [ ! -d "$AI_RULES_DIR" ]; then
    echo -e "${RED}Error: .ai-rules/ directory not found${NC}"
    exit 1
fi

# Create output directories
mkdir -p "$CURSOR_RULES_DIR"
mkdir -p "$CLAUDE_RULES_DIR"
mkdir -p "$CLAUDE_SKILLS_DIR"

# Function to add alwaysApply: true to frontmatter
add_always_apply() {
    local input_file="$1"
    local output_file="$2"

    # Check if file has frontmatter (starts with ---)
    if head -1 "$input_file" | grep -q "^---$"; then
        # Insert alwaysApply: true after the opening ---
        awk '
            NR==1 { print; next }
            /^---$/ && !added { print "alwaysApply: true"; added=1 }
            { print }
        ' "$input_file" > "$output_file"
    else
        # No frontmatter, add it
        {
            echo "---"
            echo "alwaysApply: true"
            echo "---"
            echo ""
            cat "$input_file"
        } > "$output_file"
    fi
}

# Counter for files processed
global_count=0
conditional_count=0
skill_count=0

# ============================================
# Sync global rules (add alwaysApply: true for Cursor)
# ============================================
if [ -d "$AI_RULES_DIR/global" ]; then
    echo "📁 Processing global rules..."
    for file in "$AI_RULES_DIR/global/"*.md; do
        [ -f "$file" ] || continue
        basename=$(basename "$file" .md)

        # Cursor: add alwaysApply: true and use .mdc extension
        add_always_apply "$file" "$CURSOR_RULES_DIR/${basename}.mdc"

        ((global_count++))
        echo "   ✓ ${basename}"
    done
    echo ""
fi

# ============================================
# Sync conditional rules (keep globs, add alwaysApply: false for Cursor)
# ============================================
if [ -d "$AI_RULES_DIR/conditional" ]; then
    echo "📁 Processing conditional rules..."
    for file in "$AI_RULES_DIR/conditional/"*.md; do
        [ -f "$file" ] || continue
        basename=$(basename "$file" .md)

        # Cursor: add alwaysApply: false if not present, use .mdc extension
        if head -1 "$file" | grep -q "^---$"; then
            # Has frontmatter - check if alwaysApply exists
            if grep -q "alwaysApply:" "$file"; then
                # Already has alwaysApply, just copy
                cp "$file" "$CURSOR_RULES_DIR/${basename}.mdc"
            else
                # Add alwaysApply: false after opening ---
                awk '
                    NR==1 { print; next }
                    /^---$/ && !added { print "alwaysApply: false"; added=1 }
                    { print }
                ' "$file" > "$CURSOR_RULES_DIR/${basename}.mdc"
            fi
        else
            # No frontmatter, just copy
            cp "$file" "$CURSOR_RULES_DIR/${basename}.mdc"
        fi

        # Claude Code: create symlink
        ln -sf "../../.ai-rules/conditional/${basename}.md" "$CLAUDE_RULES_DIR/${basename}.md" 2>/dev/null || \
        cp "$file" "$CLAUDE_RULES_DIR/${basename}.md"

        ((conditional_count++))
        echo "   ✓ ${basename}"
    done
    echo ""
fi

# ============================================
# Sync skills (Claude Code only)
# ============================================
if [ -d "$AI_RULES_DIR/skills" ]; then
    echo "📁 Processing skills (Claude Code only)..."
    for file in "$AI_RULES_DIR/skills/"*.md; do
        [ -f "$file" ] || continue
        basename=$(basename "$file" .md)

        # Create skill directory and symlink the file as SKILL.md
        mkdir -p "$CLAUDE_SKILLS_DIR/$basename"
        ln -sf "../../../.ai-rules/skills/${basename}.md" "$CLAUDE_SKILLS_DIR/$basename/SKILL.md" 2>/dev/null || \
        cp "$file" "$CLAUDE_SKILLS_DIR/$basename/SKILL.md"

        ((skill_count++))
        echo "   ✓ ${basename}"
    done
    echo ""
fi

# ============================================
# Summary
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Sync complete!${NC}"
echo ""
echo "Files synced:"
echo "  • Global rules:      $global_count → .cursor/rules/*.mdc"
echo "  • Conditional rules: $conditional_count → .cursor/rules/*.mdc + .claude/rules/*.md"
echo "  • Skills:            $skill_count → .claude/skills/*"
echo ""
echo "Generated directories:"
echo "  • $CURSOR_RULES_DIR"
echo "  • $CLAUDE_RULES_DIR"
echo "  • $CLAUDE_SKILLS_DIR"
echo ""
echo -e "${YELLOW}Remember: Edit files in .ai-rules/, not the generated files!${NC}"
