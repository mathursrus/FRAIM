#!/bin/bash

# Project Issue Preparation Script
# This script automates the deterministic workflow from prep.md

set -e  # Exit on any error

# Function to detect editor from issue labels
detect_editor_from_issue() {
    local issue_num=$1
    
    # Try GitHub CLI first
    if command -v gh &> /dev/null; then
        local labels=$(gh issue view $issue_num --json labels --jq '.labels[].name' 2>/dev/null | grep "^ai-agent:" | head -1)
        if [ -n "$labels" ]; then
            echo "$labels" | sed 's/ai-agent://'
            return 0
        fi
    else
        # Fallback to curl (requires GitHub token in GITHUB_TOKEN env var)
        if [ -n "$GITHUB_TOKEN" ]; then
            local labels=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                "https://api.github.com/repos/{OWNER}/{REPO}/issues/$issue_num" \
                | grep -o '"name":"ai-agent:[^"]*"' | sed 's/"name":"ai-agent://' | sed 's/"//' 2>/dev/null)
        else
            echo "Warning: No GitHub CLI or GITHUB_TOKEN found. Cannot auto-detect editor from issue labels." >&2
        fi
    fi
    
    return 1
}

# Function to open editor with project
open_editor() {
    local editor=$1
    local project_path=$2
    
    case "$editor" in
        "windsurf")
            if command -v windsurf &> /dev/null; then
                echo "Opening Windsurf..."
                windsurf "$project_path" &
            else
                echo "Windsurf not found in PATH"
                return 1
            fi
            ;;
        "cursor")
            if command -v cursor &> /dev/null; then
                echo "Opening Cursor..."
                cursor "$project_path" &
            else
                echo "Cursor not found in PATH"
                return 1
            fi
            ;;
        *)
            echo "Unknown editor: $editor"
            return 1
            ;;
    esac
}

# Check if issue number is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <issue_number> [editor]"
    echo "Example: $0 123 windsurf"
    exit 1
fi

ISSUE_NUMBER=$1
EDITOR=${2:-""}  # Will be set later if not provided

echo "=== Project Issue Preparation ==="
echo "Preparing for Issue #$ISSUE_NUMBER"
echo

# Auto-detect editor from issue labels if not provided
if [ -z "$EDITOR" ]; then
    echo "Auto-detecting editor from issue labels..."
    DETECTED_EDITOR=$(detect_editor_from_issue $ISSUE_NUMBER)
    if [ -n "$DETECTED_EDITOR" ]; then
        EDITOR="$DETECTED_EDITOR"
        echo "Detected editor: $EDITOR"
    else
        echo "Could not auto-detect editor. Defaulting to windsurf."
        EDITOR="windsurf"
    fi
else
    echo "Using specified editor: $EDITOR"
fi

# Get current directory and parent
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")

echo "Current directory: $CURRENT_DIR"
echo "Parent directory: $PARENT_DIR"

# Define clone directory name
CLONE_DIR="FRAIM - Issue $ISSUE_NUMBER"
CLONE_PATH="$PARENT_DIR/$CLONE_DIR"

# Check if directory already exists
if [ -d "$CLONE_PATH" ]; then
    echo "Directory already exists: $CLONE_PATH"
    echo "Entering existing directory..."
    cd "$CLONE_PATH"
else
    echo "Creating new clone directory..."
    
    # Change to parent directory
    cd "$PARENT_DIR"

# Clone the repository
echo "Cloning to: $CLONE_PATH"
git clone https://github.com/mathursrus/FRAIM.git "$CLONE_DIR"

# Change into the cloned repository
cd "$CLONE_DIR"
fi

# Create and checkout feature branch
BRANCH_NAME="feature/$ISSUE_NUMBER"
echo "Creating/checking out branch: $BRANCH_NAME"

if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    echo "Branch exists locally, checking out..."
    git checkout $BRANCH_NAME
elif git show-ref --verify --quiet refs/remotes/origin/$BRANCH_NAME; then
    echo "Branch exists on remote, checking out..."
    git checkout -b $BRANCH_NAME origin/$BRANCH_NAME
else
    echo "Creating new branch..."
    git checkout -b $BRANCH_NAME
fi

# Push branch to origin if it doesn't exist remotely
if ! git show-ref --verify --quiet refs/remotes/origin/$BRANCH_NAME; then
    echo "Pushing new branch to origin..."
    git push -u origin $BRANCH_NAME
fi

echo
echo "✅ Setup complete!"
echo "📁 Working directory: $CLONE_PATH"
echo "🌿 Branch: $BRANCH_NAME"
echo "🔧 Editor: $EDITOR"
echo

# Open the editor
echo "Opening $EDITOR..."
if open_editor "$EDITOR" "$CLONE_PATH"; then
    echo "✅ $EDITOR opened successfully"
else
    echo "❌ Failed to open $EDITOR"
    echo "Please manually open your editor with: $CLONE_PATH"
fi

echo
echo "🚀 Ready to work on Issue #$ISSUE_NUMBER!"
echo "Remember to work only in this directory: $CLONE_PATH"