#!/bin/bash

# Check if implementation files have corresponding test files
# Usage: ./ensure-tests-present.sh [PR_NUMBER] [REPO]

set -e

PR_NUMBER=$1
REPO=${2:-$(git remote get-url origin | sed 's/.*github.com[:\/]\(.*\)\.git/\1/')}
GH_TOKEN=${GH_TOKEN:-$(gh auth token)}

if [ -z "$PR_NUMBER" ]; then
  echo "Error: PR number is required"
  echo "Usage: $0 [PR_NUMBER] [REPO]"
  exit 1
fi

if [ -z "$GH_TOKEN" ]; then
  echo "Error: GitHub token not found. Please set GH_TOKEN environment variable or login with 'gh auth login'"
  exit 1
fi

echo "Checking tests for PR #$PR_NUMBER in $REPO..."

# Get list of changed files in PR
echo "Fetching changed files..."
CHANGED_FILES=$(gh pr view $PR_NUMBER --repo $REPO --json files -q '.files[].path')

if [ -z "$CHANGED_FILES" ]; then
  echo "No files found in PR #$PR_NUMBER"
  exit 0
fi

# Check for implementation files without tests
echo "Analyzing implementation files..."
IMPLEMENTATION_FILES=$(echo "$CHANGED_FILES" | grep -E '\.ts$|\.js$' | grep -v '\.test\.|\.spec\.|test-')

if [ -z "$IMPLEMENTATION_FILES" ]; then
  echo "No implementation files found in PR"
  exit 0
fi

# Track missing tests
MISSING_TESTS=0
MISSING_FILES=""

# For each implementation file, check if a test exists
echo "Checking for corresponding test files..."
while IFS= read -r FILE; do
  BASE_NAME=$(basename $FILE .ts)
  BASE_NAME=${BASE_NAME%.js} # Remove .js extension if present
  DIR_NAME=$(dirname $FILE)
  
  # Check for test file patterns
  if ! echo "$CHANGED_FILES" | grep -q -E "${BASE_NAME}\.test\.|${BASE_NAME}\.spec\.|test-${BASE_NAME}"; then
    echo "⚠️ No test file found for $FILE"
    MISSING_TESTS=1
    MISSING_FILES="$MISSING_FILES\n- $FILE"
  else
    echo "✅ Test found for $FILE"
  fi
done <<< "$IMPLEMENTATION_FILES"

# Check if PR has status:test-exempt label
echo "Checking PR labels..."
if [ "$MISSING_TESTS" = "1" ]; then
  HAS_EXEMPT_LABEL=$(gh pr view $PR_NUMBER --repo $REPO --json labels -q '.labels[].name' | grep -c "status:test-exempt" || true)
  
  if [ "$HAS_EXEMPT_LABEL" -gt 0 ]; then
    echo "PR has status:test-exempt label, proceeding despite missing tests"
    exit 0
  else
    echo -e "❌ Missing tests for the following files:$MISSING_FILES"
    echo "PR must include tests for all implementation files or have the status:test-exempt label"
    exit 1
  fi
fi

echo "✅ All implementation files have corresponding tests"
exit 0