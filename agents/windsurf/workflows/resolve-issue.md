---
description: Resolve issue (once confirmed complete)
auto_execution_mode: 3
---

Ensure branch: feature/{issue}-{slug} is checked out (create if needed).

Commit & push any pending changes.

Sync from origin/master into this branch (merge or rebase), resolve conflicts, push again.

Check the results of GitHub Action that runs the full tests in the cloud.

If they pass: open/update the Implementation PR, label it, and enable auto-merge.

If they fail: no PR is opened/updated; fix, push again, repeat.

Once PR is approved and related actions succeed, do the following: 
- **MANDATORY**: Verify PR is actually merged to master before proceeding
- **MANDATORY**: Run merge verification checks (see below)
- Close the issue ONLY after merge verification passes
- Delete the branch remotely.
- If operating locally, delete the local branch and the local codebase.
- Say Hoorah !

## Mandatory Merge Verification

**Before closing ANY issue, verify the following:**

1. ✅ **PR Status**: PR shows "merged" status, not just "closed"
2. ✅ **Merge Commit**: Verify merge commit exists in master
3. ✅ **Files in Master**: Confirm expected files are present in master

### **Verification Commands**
```bash
# Check PR is merged, not just closed
gh pr view <PR_NUMBER> --json merged

# Verify merge commit in master
git fetch origin master
git log origin/master --oneline | grep "PR #<PR_NUMBER>"

# Verify files in master
git show origin/master:path/to/expected/file
```

**CRITICAL**: Do not close the issue until merge verification passes. This prevents work loss incidents like Issue #112.