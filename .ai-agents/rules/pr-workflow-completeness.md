# PR Workflow Completeness

## ⚠️ CRITICAL: Complete PR Lifecycle Required
**EVERY PR MUST BE MONITORED FROM CREATION TO MERGE**
- Design PRs, Test Plan PRs, Implementation PRs - ALL need monitoring
- NO EXCEPTIONS - even if you think the work is "complete"
- If you push code, you MUST poll for feedback


## INTENT
To ensure AI agents autonomously handle the complete PR lifecycle with proper monitoring, feedback handling, and testing, eliminating gaps that require human intervention and ensuring thorough end-to-end handling of development processes.

**This applies to every phase - design, test, implementation ... anytime you submit a PR, you must follow all these rules.**

## PRINCIPLES
- **Complete Autonomy**: Agents should handle the entire PR workflow without requiring human prompting
- **Proactive Monitoring**: Continuously check status of actions and PRs
- **Comprehensive Feedback**: Address all comments before resubmission
- **Evidence-Based Progress**: Document test results and implementation status
- **Standardized Bug Fixing**: Follow consistent reproduce-test-fix workflow

## REQUIREMENTS

### 1. Git Action Monitoring
- **MUST** set issue to status:needs-review only after all Git actions associated with the PR are successful
- **MUST** monitor these actions after commit and sync
- **MUST** check every 30 seconds until completion
- **MUST** timeout after 10 minutes (20 attempts) and notify the user
- **MUST** handle network failures with exponential backoff
- **MUST** report action failures with detailed error information

#### Implementation
```
After commit and push:
1. Check GitHub Actions status every 30 seconds
2. If actions are still running, continue polling
3. If actions fail, understand the failure, debug and fix it, iterate until actions succeed. If actions do not succeed after 3 tries, give up and give the user an analysis of the failures and next steps
4. If 10 minutes elapse and the GitHub Action hasn't made progress, timeout and notify user
5. If actions succeed, proceed to set issue status as per your workflow stage, and then poll as below. 
```

### 2. PR Feedback Polling
- **MUST** poll every 1 minute awaiting PR feedback after submission
- **MUST NOT** expect a human to come back and tell what to do
- **MUST** timeout after 24 hours and notify the user
- **MUST** handle network failures with exponential backoff
- **MUST** process all types of feedback (comments, suggestions, reviews)
- **🔥 REMINDER: This applies to DESIGN PRs too! Even if you just created a design document, you MUST poll for feedback on the PR.**

#### Implementation
```
After PR submission:
1. Poll for PR feedback every 1 minute
2. If new feedback is found, process it immediately
3. If no feedback after 24 hours, notify user
4. Continue polling until PR has been reviewed, then take action based on the phase of the workflow you are in
```

### 3. PR Comment Handling
- **MUST** address every comment in the PR before resubmitting for review
- **MUST** handle threaded discussions and follow all conversation threads
- **MUST** implement code suggestions or explain why not
- **MUST** reply to each comment indicating how it was addressed
- **MUST** verify all comments are addressed before changing status back to needs-review

#### Implementation
```
When PR feedback is received:
1. Set status:wip
2. Track each comment that requires action
3. Address each comment with appropriate changes
4. Reply to each comment explaining how it was addressed
5. Verify all comments are addressed
6. Set status:needs-review when complete
```

### 4. Test Result Documentation
- **MUST** add a comment to the issue with results of test cases before setting status:needs-review
- **MUST** include which tests failed and analysis on failures
- **MUST** document test coverage and any gaps
- **MUST** provide evidence of test execution
- **MUST** include specific test commands run and their output
- **MUST** clean up cruft that was created for temporary testing, logs, debugs, etc. Do not commit these files.

#### Implementation
```
Before setting status:needs-review:
1. Run all relevant tests
2. Document test results in a comment on the issue
3. Include test command output
4. Analyze any failures
5. Document test coverage
6. Only then set status:needs-review
```

### 5. Bug Fix Workflow
- **MUST** reproduce the issue first
- **MUST** write a test case that fails
- **MUST** implement the fix
- **MUST** ensure the test case passes
- **MUST** document the entire process

#### Implementation
```
When fixing a bug:
1. Reproduce the issue and document steps
2. Write a test case that fails due to the bug
3. Implement the fix
4. Verify the test now passes
5. Document the entire process in the PR
```

## EXAMPLES

### Good: Complete Git Action Monitoring
```
Action: Pushed changes to feature branch
Monitoring: Checking GitHub Actions status every 30s
Status at 30s: 2 workflows running
Status at 60s: 1 workflow running, 1 completed
Status at 90s: All workflows completed successfully
Result: Setting status:needs-review
```

### Bad: Incomplete Monitoring
```
Action: Pushed changes to feature branch
Result: Immediately set status:needs-review without checking actions
```

### Good: Proper PR Feedback Handling
```
Action: PR submitted for review
Monitoring: Polling for feedback every 1 minute
Feedback at 10m: 3 comments received
Response: 
- Set status:wip
- Addressed each comment with code changes
- Replied to each comment explaining changes
- Verified all comments addressed
- Set status:needs-review
```

### Bad: Incomplete Feedback Handling
```
Action: PR submitted for review
Response: Waiting for user to tell me about feedback
```

### Good: Thorough Test Documentation
```
Before setting status:needs-review:
- Ran tests: npm test test-calendar-sync.ts
- Results: 10/10 tests passing
- Coverage: 95% of code paths tested
- Evidence: Full test output included in comment
```

### Bad: Missing Test Documentation
```
Action: Set status:needs-review
Documentation: None provided about test results
```

### Good: Proper Bug Fix Workflow
```
Bug: Calendar sync timeout
Process:
1. Reproduced by setting up test environment with slow network
2. Wrote test case that fails due to timeout
3. Implemented exponential backoff with jitter
4. Verified test now passes
5. Documented entire process in PR
```

### Bad: Incomplete Bug Fix
```
Bug: Calendar sync timeout
Process: Added retry logic without reproducing or testing
```

## FAILURE MODES & TIMEOUTS
- Git action polling timeout: 10 minutes (20 attempts)
- PR feedback polling timeout: 24 hours
- Network failures: Use exponential backoff starting at 30s

## OBSERVABILITY
- Log all polling attempts and results
- Track time spent in each phase of the workflow
- Alert on polling timeouts or repeated failures
- Record metrics on time to address PR feedback