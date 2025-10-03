#!/usr/bin/env bash
set -euo pipefail

# Identify changed files in the PR
mapfile -t CHANGED < <(gh pr view "$PR_NUMBER" --repo "$REPO" --json files --jq '.files[].path')

has_code=0
has_tests=0

for f in "${CHANGED[@]}"; do
  # Code paths: adjust if your code lives elsewhere
  if [[ "$f" =~ ^(src/|server/|web/|packages/) ]]; then
    has_code=1
  fi
  
  # Test paths / file patterns
  if [[ "$f" =~ (\.spec\.ts$|\.test\.ts$|\.spec\.tsx$|\.test\.tsx$|^e2e/|^tests/|test-.*\.ts$) ]]; then
    has_tests=1
  fi
done

# If no code touched, allow
if [[ $has_code -eq 0 ]]; then
  echo "No code changes detected. Guard passed."
  exit 0
fi

# If tests changed too, allow
if [[ $has_tests -eq 1 ]]; then
  echo "Test changes detected. Guard passed."
  exit 0
fi

# Otherwise, require a previously merged Test Plan PR that references the same issue
issue_num=$(gh pr view "$PR_NUMBER" --repo "$REPO" --json closingIssuesReferences --jq '.[].number' || true)

if [[ -z "$issue_num" ]]; then
  echo "No linked issue; and no tests changed. Failing."
  exit 1
fi

tp_count=$(gh pr list --repo "$REPO" --state merged --label "type:test-plan" --search "in:body #${issue_num}" --json number | jq 'length')

if [[ "$tp_count" -ge 1 ]]; then
  echo "Found merged Test Plan PR for issue #$issue_num. Guard passed."
  exit 0
fi

echo "No tests changed and no merged Test Plan PR for issue #$issue_num. Failing."
exit 1