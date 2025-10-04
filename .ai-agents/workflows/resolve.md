# Issue Resolution Workflow

## INTENT
To provide a systematic approach to resolving issues from development through merge verification and cleanup, ensuring no work is lost and all changes are properly integrated into the main codebase.

## PRINCIPLES
- **Verification First**: Always verify merges before closing issues
- **Complete Cleanup**: Remove all traces of feature branches
- **No Work Loss**: Prevent incidents like Issue #112 through proper verification
- **Systematic Process**: Follow established steps in order
- **Evidence-Based**: Provide concrete verification of completion

## CRITICAL DEPENDENCY
**This workflow MUST be used in conjunction with `.ai-agents/rules/merge-requirements.md`** which contains:
- **Pre-Push Workflow** (for feature branches during development)
- **PR Description Template** (for PR creation)
- **Final Merge Process** (for merging to master - used in this workflow)
- **Conflict Resolution Guide** (for resolving conflicts during rebase)

**Note**: The Pre-Push workflow applies to feature branch development. This resolve.md workflow focuses on the **final merge into master** and uses the Final Merge Process from merge-requirements.md.

## RESOLUTION WORKFLOW

**PREREQUISITE**: This workflow assumes:
- ✅ All development work is complete
- ✅ All tests have been run on the feature branch
- ✅ PR has been created and approved
- ✅ Feature branch is ready for merge

### 1. Execute the Merge
Use GitHub MCP to merge the PR:

```bash
# Merge the PR using GitHub MCP
gh pr merge <PR_NUMBER> --rebase
```

**If conflicts occur during merge:**
- GitHub will reject the merge with conflict details
- Use `gh pr view <PR_NUMBER>` to see conflict details
- Resolve conflicts intelligently using the **Conflict Resolution Guide** from `merge-requirements.md`
- Keep master's base implementation and add your enhancements on top
- Test the resolution: `npm run build && npm run test-smoke test*.ts`
- Push the resolved changes and retry the merge

### 2. Wait for Master CI Smoke Tests
After successful merge, monitor the master branch CI:
- Check GitHub Actions for the master branch
- Wait for smoke tests to complete successfully
- **CRITICAL**: Do not proceed until CI passes

### 3. Verify Code Made it to Master
**MANDATORY**: Confirm the merge was successful:
```bash
# Check PR is merged, not just closed
gh pr view <PR_NUMBER> --json merged

# Verify merge commit in master
git fetch origin master
git log origin/master --oneline | grep "PR #<PR_NUMBER>"

# Verify files in master
git show origin/master:path/to/expected/file
```

### 4. Handle CI Failures
**If master CI fails:**
- Debug the issue immediately
- Fix the problem in the feature branch
- Push the fix and re-merge
- Repeat until CI passes
- **Do not close the issue until CI passes**

### 5. Confirm all good
**Only after CI passes successfully:**

**Add Resolution Comment if conflicts with master had to be resolved:**
- Add a comment to the issue using GitHub MCP:
```bash
gh issue comment <ISSUE_NUMBER> --body "✅ Encountered conflicts during merge with master.

**Conflict Resolution Notes:**
- Resolved conflicts in: [list files with conflicts]
- Resolution strategy: [explain what was done]
- Kept master's base implementation and added enhancements on top"
```

**Verify the following:**
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

**CRITICAL**: Do not close the issue until merge verification passes. This prevents work loss incidents 

### 6. Issue Resolution & Cleanup
**Close the Issue:**
- Close the issue with resolution comment using GitHub MCP:
```bash
gh issue close <ISSUE_NUMBER> --comment "✅ Issue resolved and merged to master. CI smoke tests passed."
```

**Cleanup Branch:**
    ```bash
    npx tsx .ai-agents/scripts/cleanup-branch.ts
    ```

### 7. Celebrate
- Say Hoorah !


## EXAMPLES

### Good: Proper Resolution Process
```
Issue #84: "Fix API integration timeout"
PREREQUISITE: ✅ Development complete, tests passed, PR approved
1. ✅ Merge: Used `gh pr merge <PR_NUMBER> --rebase`
2. ✅ Conflicts: Resolved conflicts intelligently (kept master's base)
3. ✅ CI Wait: Waited for master CI smoke tests to pass
4. ✅ Verification: Confirmed merge commit exists in master
5. ✅ Schema: Cleaned up database schema BEFORE branch deletion
6. ✅ Comment: Added resolution comment with conflict resolution notes
7. ✅ Close: Closed issue with resolution comment using `gh issue close`
8. ✅ Cleanup: Deleted branch after schema cleanup
Result: Complete resolution with no work loss
```

### Bad: Incomplete Resolution
```
Issue #84: "Fix API integration timeout"
PREREQUISITE: ✅ Development complete, tests passed, PR approved
1. ✅ Merge: Used `gh pr merge <PR_NUMBER> --rebase`
2. ❌ Skip: Didn't wait for master CI smoke tests
3. ❌ Skip: Didn't verify merge commit exists
4. ❌ Skip: Didn't clean up schema BEFORE branch deletion
5. ❌ Skip: Didn't add resolution comment with conflict notes
6. ❌ Close: Closed issue without CI verification
Result: Work lost, schema not cleaned up, CI may have failed
```
