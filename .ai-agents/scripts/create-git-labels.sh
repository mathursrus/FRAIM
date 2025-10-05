#!/bin/bash

# Create GitHub labels from JSON file
# Usage: ./create-git-labels.sh labels.json

if [ $# -eq 0 ]; then
    echo "Usage: $0 <labels.json>"
    exit 1
fi

LABELS_FILE="$1"

if [ ! -f "$LABELS_FILE" ]; then
    echo "Error: $LABELS_FILE not found"
    exit 1
fi

echo "🏷️  Creating GitHub labels from $LABELS_FILE..."

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found. Please install it first:"
    echo "   https://cli.github.com/"
    echo "   Then run: gh auth login"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub. Please run:"
    echo "   gh auth login"
    exit 1
fi

# Parse JSON and create labels
node -e "
const fs = require('fs');
const labels = JSON.parse(fs.readFileSync('$LABELS_FILE', 'utf8'));

labels.forEach(label => {
  const command = \`gh label create \\\"\${label.name}\\\" --color \\\"\${label.color}\\\" --description \\\"\${label.description}\\\"\`;
  console.log(command);
});
" | while read -r command; do
    echo "  Executing: $command"
    eval "$command" || echo "    ⚠️  Label might already exist"
done

echo "✅ GitHub labels creation complete!"
