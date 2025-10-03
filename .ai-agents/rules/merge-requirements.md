# Merge Requirements

## INTENT
To ensure the stability of the `master` branch and prevent accidental overwrites by requiring all agents to apply their local changes *on top of* the latest `master` branch changes, ensuring `master`'s history is never overwritten.

## PRINCIPLES
- **Rebase, Don't Merge:** Always rebase your feature branch on top of the latest `master` to maintain a clean, linear history and ensure changes from `master` are applied first.
- **Verify After Rebase:** Run all tests and builds *after* a successful rebase to ensure stability before pushing.
- **Document Conflict Resolution:** Clearly document how any rebase conflicts were resolved, emphasizing how `master`'s changes were preserved.
- **Force-with-Lease:** When pushing a rebased branch, use `git push --force-with-lease` to avoid overwriting work from other contributors.

## WORKFLOW

## MANDATORY PRE-PUSH WORKFLOW

### Before ANY push to your feature branch:
```bash
# 1. Sync with latest master
git fetch origin
git rebase origin/master

# 2. If conflicts occur, resolve them using conflict resolution guide
# (Git will pause and show you conflict markers)
git rebase --continue

# 3. Verify everything works
npm run build
npm run test-smoke test*.ts

# 4. Only then push
git push origin <your-feature-branch> --force-with-lease
```

### This workflow is MANDATORY because:
- Prevents creating stale PRs
- Ensures your changes work with latest master
- Reduces merge conflicts
- Required by GitHub branch protection rules

## DETAILED REBASE PROCESS
1.  **Sync with `master`:** Before pushing your changes, rebase your feature branch on top of the latest `master` branch. This applies `master`'s changes first, then your local changes on top.

    ```bash
    git checkout <your-feature-branch>
    git fetch origin
    git rebase origin/master
    ```

2.  **Resolve Rebase Conflicts:** If there are any conflicts during the rebase, you must resolve them intelligently. The rebase process will pause to allow you to fix the files. Your goal is to preserve the changes from `master` while reapplying your feature's changes.

    ## CONFLICT RESOLUTION DURING REBASE

    ### When Git Pauses for Conflicts:
    1. **Read the conflict markers carefully:**
       - `<<<<<<< HEAD` = Your changes
       - `=======` = Separator  
       - `>>>>>>> origin/master` = Master's changes

    2. **Understand what each version does:**
       - Master's version = What's already in production
       - Your version = What you're trying to add

    3. **Resolution Strategy:**
       - **Keep master's base** (it's already tested/deployed)
       - **Add your enhancements** on top
       - **Never overwrite master's working code**
       - **Never lose your new functionality**

    4. **Common Conflict Scenarios:**

       **Scenario 1: Same function, different implementations**
       ```typescript
       <<<<<<< HEAD (your changes)
       async function processEmail(email: string) {
         // Your new implementation
         return await this.emailService.process(email);
       }
       =======
       async function processEmail(email: string) {
         // Master's updated implementation  
         return await this.emailService.processWithValidation(email);
       }
       >>>>>>> origin/master
       ```
       
       **Resolution:** Keep master's version + add your enhancements
       ```typescript
       async function processEmail(email: string) {
         // Master's base implementation
         const result = await this.emailService.processWithValidation(email);
         // Your additional logic
         return await this.enhanceResult(result);
       }
       ```

       **Scenario 2: Different functions, no overlap**
       ```typescript
       <<<<<<< HEAD (your changes)
       // Your new function
       async function newFeature() {
         return "new stuff";
       }
       =======
       // Master's new function  
       async function masterFeature() {
         return "master stuff";
       }
       >>>>>>> origin/master
       ```
       
       **Resolution:** Keep both (no conflict, just different functions)
       ```typescript
       // Master's function
       async function masterFeature() {
         return "master stuff";
       }

       // Your function
       async function newFeature() {
         return "new stuff";
       }
       ```

    5. **After resolving conflicts:**
       ```bash
       # After resolving conflicts in your IDE
       git add <resolved-file-1> <resolved-file-2>
       git rebase --continue
       ```

    ### NEVER DO THIS:
    ❌ "Accept Current Change" (your version) - overwrites master
    ❌ "Accept Incoming Change" (master's version) - loses your work
    ❌ "Accept Both Changes" - creates duplicate code

    ### ALWAYS DO THIS:
    ✅ Read both versions carefully
    ✅ Understand what each change does
    ✅ Merge intelligently or choose the better implementation
    ✅ Test the resolution with: npm run build && npm run test-smoke
    ✅ Document your resolution in the PR description

3.  **Run Verification Checks:** After the rebase is complete, you must run all local verification checks to ensure the codebase is stable.
    *   **Build the project:** Run the build command to ensure there are no compilation errors.
    *   **Run tests:** Execute the full test suite to confirm that your changes have not introduced any regressions.

4.  **Push Your Changes:** Once all checks have passed, push your rebased branch. You must use `--force-with-lease` because the rebase has rewritten your branch's commit history.

    ```bash
    git push origin <your-feature-branch> --force-with-lease
    ```

5.  **Pull Request:** When creating a pull request, the description must include a confirmation that this rebase process was followed and a detailed summary of how any conflicts were resolved.

    ## PR Description Template
    ```markdown
    ## Merge Process Confirmation
    - [ ] Rebased on latest master
    - [ ] Resolved X conflicts in files: [list files]
    - [ ] Resolution strategy: [explain what you did]
    - [ ] Verified with: npm run build && npm run test-smoke
    - [ ] All tests passing: ✅

    ## Conflict Resolution Summary
    ### Files with conflicts:
    - `src/file1.ts`: [Brief description of how conflict was resolved]
    - `src/file2.ts`: [Brief description of how conflict was resolved]

    ### Resolution approach:
    [Explain your overall strategy - e.g., "Kept master's base implementation and added my enhancements on top"]
    ```

## FINAL MERGE PROCESS (After PR Approval)

### 6. **Execute the Merge:** Once your PR is approved and ready, perform the final merge:

    ```bash
    # 1. Navigate to your PR on GitHub
    # 2. Click "Merge pull request" button
    # 3. GitHub will automatically:
    #    - Rebase your branch on latest master
    #    - Apply your changes on top
    #    - Create a clean, linear history
    #    - Merge into master
    ```

### 7. **Post-Merge Cleanup:** After successful merge:

    ```bash
    # 1. Switch to master and pull latest changes
    git checkout master
    git pull origin master

    # 2. Delete your feature branch (local)
    git branch -d <your-feature-branch>

    # 3. Delete your feature branch (remote)
    git push origin --delete <your-feature-branch>

    # 4. Verify the merge was successful
    git log --oneline -5
    ```

### 8. **Final Verification:** Ensure everything is working:

    ```bash
    # Run final tests to confirm merge didn't break anything
    npm run build
    npm run test-smoke test*.ts
    ```

## MERGE WORKFLOW SUMMARY

### Complete Process:
1. **Development** → Work on feature branch
2. **Pre-Push** → Rebase on master, resolve conflicts, test
3. **Push** → Push to GitHub
4. **PR Creation** → Create PR with detailed description
5. **Review** → Wait for approval
6. **Merge** → Click "Merge pull request" on GitHub
7. **Cleanup** → Delete branches, verify merge
8. **Verification** → Run final tests

### Key Points:
- ✅ **GitHub handles the final rebase** automatically during merge
- ✅ **No manual rebasing** needed before merge
- ✅ **Linear history** maintained automatically
- ✅ **All conflicts resolved** during the merge process
- ✅ **Clean, up-to-date master** branch

By following this process, we ensure that the `master` branch always remains in a stable and deployable state. Failure to follow these rules will result in the rejection of your pull request.