# Testing Phase

## INTENT
To create comprehensive test coverage that accurately reproduces issues and validates solutions, ensuring robust testing through proper test structure, failure verification, and systematic test execution.

## PRINCIPLES
- **Test-Driven**: Write tests that reproduce the issue before fixing
- **Comprehensive Coverage**: Ensure all scenarios are tested
- **Failure Verification**: Confirm tests fail before implementation
- **Proper Structure**: Use established test patterns and frameworks
- **Systematic Execution**: Follow consistent testing procedures

## TESTING WORKFLOW

### Step 1: Issue Identification
Ask for {issue_number} (and optional {slug}); confirm target branch feature/{issue_number}-{slug}.

### Step 2: Phase Initiation
Label the issue 'phase:tests'. (GitHub Action will automatically label the issue `status:wip` and update the existing draft PR)

### Step 3: Environment Setup
**IMPORTANT**: The user has already run `prep-issue.sh` which has:
- ✅ Created the feature branch
- ✅ Checked out the branch
- ✅ Created draft PR
- ✅ Indexed the codebase with Serena
- ✅ Opened the editor in the prepared workspace

You can start working immediately in the prepared environment. No need to create branches or wait for GitHub Actions.

### Step 4: Work Location
You are already in the correct workspace prepared by the user. Confirm you're on the right branch and start working. 

### Step 5: Testing Work
Your work entails the following:

- Review the RFC associated with this issue.
- Determine whether tests need to be added to an existing test suite, or a new one needs to be created.
- **CRITICAL: Write INTEGRATION tests that demonstrate the REAL USER SCENARIO**
  - Test the actual end-to-end user experience, not unit tests for hypothetical fixes
  - Use real services and APIs where possible (not mocks)
  - Verify the issue occurs in the real system as described in the issue
  - Example: For email threading issues, actually send emails and verify they appear as new messages vs replies
- Run the test cases to ensure they fail (demonstrating the issue exists)
- Flip issue to 'status:needs-review' and remove 'status:wip'

**❌ DO NOT:**
- Write unit tests for code that doesn't exist yet
- Test hypothetical fixes or solutions
- Create mock tests that don't use real services
- Test individual components in isolation

**✅ DO:**
- Test the complete user workflow end-to-end
- Use real APIs and services when possible
- Verify the actual problem described in the issue
- Create tests that will pass AFTER the fix is implemented

### Step 6: Iteration
If workflow actions or reviewer feedback indicates more work is needed, ensure the issue is set back to `status:wip` and continue working as above.

## EXAMPLES

### Good: Comprehensive Testing Process
```
Issue #84: "Fix calendar sync timeout"
1. ✅ Identified: Issue #84, branch feature/84-fix-sync
2. ✅ Phase: Set phase:tests, PR created
3. ✅ Environment: User ran prep-issue.sh, ready to work
4. ✅ Location: Working in prepared workspace with Serena indexing
5. ✅ RFC Review: Read docs/rfcs/84-fix-sync-timeout.md
6. ✅ Analysis: Determined need to add timeout tests
7. ✅ Test Creation: Added test cases for timeout scenarios
8. ✅ Failure Verification: Confirmed tests fail before fix
9. ✅ Review: Set status:needs-review
10. ✅ Iteration: Incorporated feedback, updated tests
Result: Comprehensive test coverage with proper structure
```

### Bad: Incomplete Testing Process
```
Issue #84: "Fix calendar sync timeout"
1. ✅ Identified: Issue #84
2. ❌ Skip: Didn't review RFC
3. ❌ Skip: Started testing without understanding requirements
4. ❌ Skip: No test cases written
5. ❌ Skip: Didn't verify tests fail
6. ❌ Skip: No test structure followed
Result: Incomplete, ineffective testing
```