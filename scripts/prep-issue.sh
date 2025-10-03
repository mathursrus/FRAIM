#!/bin/bash

# Prepare a GitHub issue for AI agent work
# Usage: ./prep-issue.sh [issue_number] [repo_owner/repo_name]

# Check if required arguments are provided
if [ $# -lt 2 ]; then
  echo "Error: Missing required arguments"
  echo "Usage: $0 [issue_number] [repo_owner/repo_name]"
  exit 1
fi

ISSUE_NUMBER=$1
REPO=$2
GH_TOKEN=${GH_TOKEN:-$(gh auth token)}

if [ -z "$GH_TOKEN" ]; then
  echo "Error: GitHub token not found. Please set GH_TOKEN environment variable or login with 'gh auth login'"
  exit 1
fi

echo "Preparing issue #$ISSUE_NUMBER in $REPO for AI agent work..."

# Get issue details
ISSUE_DATA=$(gh issue view $ISSUE_NUMBER --repo $REPO --json title,body,labels)
if [ $? -ne 0 ]; then
  echo "Error: Failed to fetch issue data"
  exit 1
fi

TITLE=$(echo $ISSUE_DATA | jq -r '.title')
BODY=$(echo $ISSUE_DATA | jq -r '.body')
LABELS=$(echo $ISSUE_DATA | jq -r '.labels[].name')

echo "Issue: $TITLE"

# Check if issue already has aiagents label
if echo "$LABELS" | grep -q "aiagents"; then
  echo "Issue already prepared for AI agents (has aiagents label)"
else
  # Add aiagents label
  echo "Adding aiagents label..."
  gh issue edit $ISSUE_NUMBER --repo $REPO --add-label "aiagents"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to add aiagents label"
    exit 1
  fi
fi

# Create feature branch if it doesn't exist
BRANCH_NAME="feature/issue-$ISSUE_NUMBER"
BRANCH_EXISTS=$(gh api repos/$REPO/branches/$BRANCH_NAME --silent || echo "not_exists")

if [ "$BRANCH_EXISTS" = "not_exists" ]; then
  echo "Creating feature branch: $BRANCH_NAME"
  gh api repos/$REPO/git/refs -F ref="refs/heads/$BRANCH_NAME" -F sha=$(gh api repos/$REPO/git/refs/heads/master | jq -r '.object.sha')
  if [ $? -ne 0 ]; then
    echo "Error: Failed to create feature branch"
    exit 1
  fi
else
  echo "Branch $BRANCH_NAME already exists"
fi

# Add kickoff comment with instructions for AI agents
COMMENT="## AI Agent Kickoff

This issue has been prepared for AI agent collaboration.

### Issue Summary
$TITLE

### Current Status
- Branch: \`$BRANCH_NAME\`
- Labels: $LABELS

### Next Steps
1. Review issue description and requirements
2. Follow the RIGOR methodology
3. Create necessary design documents
4. Implement solution
5. Add tests
6. Submit PR

### Agent Instructions
- Follow all rules in the \`/rules\` directory
- Focus on this issue only
- Document design decisions
- Verify all changes with tests"

echo "Adding kickoff comment..."
gh issue comment $ISSUE_NUMBER --repo $REPO --body "$COMMENT"
if [ $? -ne 0 ]; then
  echo "Error: Failed to add kickoff comment"
  exit 1
fi

echo "Issue #$ISSUE_NUMBER successfully prepared for AI agent work"
echo "Feature branch: $BRANCH_NAME"
exit 0