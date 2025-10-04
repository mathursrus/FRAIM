# Implementation Phase

## INTENT
To implement solutions based on approved design documents, ensuring minimal, testable code that meets requirements while following established patterns and maintaining code quality.

## PRINCIPLES
- **Design-Driven**: Follow approved RFCs and design documents
- **Minimal Implementation**: Write only the code needed for the issue
- **Test-First**: Ensure comprehensive test coverage
- **Quality Focus**: Maintain code quality and follow patterns
- **Complete**: All aspects of technical spec are implemented, tested, validated
- **Spike-First Development**: Follow `.ai-agents/rules/spike-first-development.md` to validate technology compatibility before building complex solutions

## IMPLEMENTATION WORKFLOW

### Step 1: Issue Identification
Ask for {issue_number} (and optional {slug}); confirm target branch feature/{issue_number}-{slug}.

### Step 2: Phase Initiation
Label the issue 'phase:impl'. (GitHub Action will automatically label the issue `status:wip` and update the existing draft PR)

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

### Step 5: Implementation Work
Your work entails the following:

- **SPIKE-FIRST CHECK**: Read and follow `.ai-agents/rules/spike-first-development.md`
- If implementation involves unfamiliar technology, create spike/proof-of-concept first
- Validate technology compatibility before building complex solutions
- Review the RFC associated with this issue.
- Determine whether changes need to be made to existing code, or brand new code needs to be written.
- Write the minimal set of code and test cases needed for this issue.
- **CRITICAL INTEGRITY CHECK**: Ensure test cases pass with original, unmodified criteria
- **VERIFICATION REQUIRED**: Run tests with original criteria before claiming success
- When ready for review, flip issue to 'status:needs-review' and remove 'status:wip'
- While submitting review, add a comment to the PR with evidence - use template `.ai-agents/templates/evidence/Implementation-BugEvidence.md` for bugs, `.ai-agents/templates/evidence/Implementation-FeatureEvidence.md` for features.

### Step 6: MANDATORY FINAL STATUS UPDATE
**🚨 CRITICAL - DO NOT SKIP THIS STEP:**

Once all implementation work is complete and evidence is provided:

1. **REQUIRED**: Update issue status from `status:wip` to `status:needs-review`
2. **REQUIRED**: Verify the status change was applied successfully
3. **REQUIRED**: Confirm issue is ready for user review

**This step is MANDATORY and must not be forgotten. Add it to your todo list at the start of implementation.**

## TEST INTEGRITY REQUIREMENTS

### Test Immutability Rule
**Test success criteria are immutable during implementation phase.**

#### What This Means
- Test criteria must remain unchanged from design phase
- Success requirements cannot be modified to hide failures
- Test logic cannot be adjusted to accommodate broken code
- Any changes to test requirements must be explicitly approved and documented

#### Verification Process
Before claiming any implementation is working:
1. Run tests with original, unmodified criteria
2. Verify ALL requirements pass without exception
3. Document any test modifications if absolutely necessary
4. Get explicit approval for any test changes

### Progress Transparency Requirements
**Always be honest about implementation status and challenges.**

#### Required Statements
When facing implementation challenges, explicitly state:
- "I am struggling with [specific issue] and need help"
- "The implementation is not working because [specific reason]"
- "I need to fix [specific problem] before claiming success"

#### Prohibited Statements
- "The implementation is working" (when tests fail)
- "Core functionality is complete" (when critical features broken)
- "Tests are passing" (when criteria were modified)
- "Issue is resolved" (when underlying problems exist)

### Success Verification Standards
**Genuine success requires meeting ALL original criteria without modification.**

#### Verification Checklist
Before marking any task complete:
- [ ] All original test criteria pass without modification
- [ ] No test logic was changed to accommodate broken code
- [ ] Success requirements are met exactly as originally defined
- [ ] Implementation works with real data/scenarios
- [ ] No critical functionality is missing or broken

### When Tests Fail
1. **Don't modify tests** - Fix the code instead
2. **Don't claim success** - Admit the failure
3. **Ask for help** - Be transparent about challenges
4. **Fix root causes** - Address underlying issues
5. **Verify with original criteria** - Ensure genuine success

### When Facing Difficult Challenges
1. **Be honest** - State what's not working
2. **Ask for guidance** - Don't try to fake success
3. **Focus on solutions** - Work on fixing the code
4. **Maintain integrity** - Don't compromise standards
5. **Document struggles** - Help others learn from challenges

### Step 7: Iteration
If workflow actions or reviewer feedback indicates more work is needed:

- Label the issue 'status:wip' and remove 'status:needs-review'
- Go back to Step 5 and iterate until PR is approved

## EXAMPLES

### Good: Proper Implementation Process
```
Issue #84: "Fix API integration timeout"
1. ✅ Identified: Issue #84, branch feature/84-fix-sync
2. ✅ Phase: Set phase:impl, PR created
3. ✅ Environment: User ran prep-issue.sh, ready to work
4. ✅ Location: Working in prepared workspace with Serena indexing
5. ✅ RFC Review: Read docs/rfcs/84-fix-sync-timeout.md
6. ✅ Analysis: Determined need to modify existing retry logic
7. ✅ Implementation: Added exponential backoff with jitter
8. ✅ Tests: Created test cases, all passing
9. ✅ Review: Set status:needs-review
10. ✅ Iteration: Incorporated feedback, updated implementation
Result: Clean, tested implementation following design
```

### Bad: Incomplete Implementation Process
```
Issue #84: "Fix API integration timeout"
1. ✅ Identified: Issue #84
2. ❌ Skip: Didn't review RFC
3. ❌ Skip: Started coding without understanding requirements
4. ❌ Skip: No test cases written
5. ❌ Skip: Didn't verify tests pass
6. ❌ Skip: No code review process
Result: Incomplete, untested implementation
```

## 🔥 MANDATORY COMPLETION CHECKLIST

**Before claiming implementation is complete, verify ALL items:**

### ✅ Implementation Checklist
- [ ] RFC reviewed and understood
- [ ] Code changes implemented according to design
- [ ] All test cases created and passing
- [ ] Evidence provided in GitHub issue
- [ ] PR feedback addressed (if applicable)

### ✅ CRITICAL FINAL STEPS
- [ ] **Issue status updated from `status:wip` to `status:needs-review`**
- [ ] **Status change verified successfully**
- [ ] **User notified that issue is ready for review**

**🚨 FAILURE TO COMPLETE THE STATUS UPDATE MEANS THE WORK IS NOT DONE! 🚨**
