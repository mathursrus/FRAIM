#!/bin/bash

# FRAIM - Issue Preparation Script
# This script automates the deterministic workflow for issue preparation

set -e  # Exit on any error

# Function to display usage
usage() {
    echo "Usage: $0 <issue_number> [editor]"
    echo "Example: $0 123"
    echo "Example: $0 123 windsurf"
    echo "Example: $0 123 claude"
    echo "Example: $0 123 cursor"
    echo ""
    echo "Editor options: windsurf, claude, claudecode, cursor (default)"
    echo "If no editor specified, will try to detect from GitHub issue labels"
    exit 1
}

# Function to get editor from GitHub issue labels
get_editor_from_issue() {
    local issue_num=$1
    
    # Try to get the issue labels using GitHub CLI
    if command -v gh &> /dev/null; then
        local labels=$(gh issue view $issue_num --json labels --jq '.labels[].name' 2>/dev/null)
    else
        echo "Warning: No GitHub CLI found. Cannot auto-detect editor from issue labels." >&2
        return 1
    fi
    
    # Look for ai-agent labels
    for label in $labels; do
        if [[ $label == ai-agent:* ]]; then
            local editor=${label#ai-agent:}
            echo "Found ai-agent label: $label -> editor: $editor" >&2
            echo "$editor"
            return 0
        fi
    done
    
    echo "No ai-agent label found. Using default editor." >&2
    return 1
}

# Check if issue number is provided
if [ $# -lt 1 ]; then
    usage
fi

ISSUE_NUMBER=$1
EDITOR=${2:-""}

# Auto-detect editor if not provided
if [ -z "$EDITOR" ]; then
    DETECTED_EDITOR=$(get_editor_from_issue $ISSUE_NUMBER)
    if [ $? -eq 0 ]; then
        EDITOR=$DETECTED_EDITOR
    else
        EDITOR="cursor"  # Default fallback
    fi
fi

echo "Preparing issue #$ISSUE_NUMBER with editor: $EDITOR"

# Get repository name from git remote
REPO_NAME=$(basename -s .git $(git config --get remote.origin.url))
if [ -z "$REPO_NAME" ]; then
    echo "Error: Could not determine repository name from git remote"
    exit 1
fi

# Create workspace directory
WORKSPACE_DIR="${REPO_NAME} - Issue ${ISSUE_NUMBER}"

echo "Creating workspace directory: $WORKSPACE_DIR"

# Clone repository if directory doesn't exist
if [ ! -d "$WORKSPACE_DIR" ]; then
    git clone $(git config --get remote.origin.url) "$WORKSPACE_DIR"
    cd "$WORKSPACE_DIR"
else
    cd "$WORKSPACE_DIR"
    git fetch origin
fi

# Get issue title and create branch name
ISSUE_TITLE=$(gh issue view $ISSUE_NUMBER --json title --jq '.title' 2>/dev/null || echo "issue-$ISSUE_NUMBER")
BRANCH_NAME="feature/${ISSUE_NUMBER}-$(echo "$ISSUE_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')"

echo "Branch name: $BRANCH_NAME"

# Create and switch to feature branch
if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    echo "Branch $BRANCH_NAME already exists, checking out..."
    git checkout $BRANCH_NAME
else
    echo "Creating new branch: $BRANCH_NAME"
    git checkout -b $BRANCH_NAME
fi

# Push branch to origin
git push -u origin $BRANCH_NAME

echo "✅ Issue #$ISSUE_NUMBER prepared successfully!"
echo "📁 Workspace: $WORKSPACE_DIR"
echo "🌿 Branch: $BRANCH_NAME"
echo "🎯 Editor: $EDITOR"
echo ""
echo "Next steps:"
echo "1. Open your $EDITOR editor in the workspace directory"
echo "2. Work on the issue according to the phase workflow"
echo "3. Commit and push your changes"