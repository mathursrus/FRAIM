# Systematic Debugging Approach for Multi-Tenancy issues

## INTENT
To prevent inefficient debugging practices that waste time and frustrate users by running tests repeatedly without fixing root causes.

## PRINCIPLES
- Analyze test failures before re-running tests
- Focus on broken functionality, not working tests
- Follow user instructions immediately
- Fix root causes, not symptoms
- Use systematic approach for multi-tenancy debugging

## MANDATORY DEBUGGING WORKFLOW

### 1. **Before Re-running Any Test**
- [ ] Read the test output carefully to understand WHY it failed
- [ ] Identify the specific error messages or assertions that failed
- [ ] Determine if it's a configuration issue, missing data, or broken functionality
- [ ] Plan the specific fix needed

### 2. **Multi-Tenancy Debugging Checklist**
- [ ] Verify executive context is being passed correctly (headers + query params)
- [ ] Check that API calls include `x-executive-id` header
- [ ] Ensure test navigation includes `executive_id` query parameter
- [ ] Verify middleware is extracting executive context properly
- [ ] Check that database operations use correct executive ID

### 3. **Test Analysis Template**
When a test fails, answer these questions:
- What specific assertion failed?
- What data was expected vs. what was received?
- Is the issue in the test setup, API call, or UI logic?
- Are all required headers/parameters being sent?
- Is the executive context being set correctly?

### 4. **Prohibited Actions**
- ❌ Running the same failing test multiple times without analysis
- ❌ Adding debug logging without fixing the underlying issue
- ❌ Running tests that are already working
- ❌ Ignoring specific user instructions
- ❌ Making assumptions about what's broken

### 5. **Required Actions**
- ✅ Analyze test output to identify root cause
- ✅ Fix the specific issue identified
- ✅ Verify the fix works before moving on
- ✅ Follow user instructions exactly as given
- ✅ Focus on broken functionality only

## COMMON MULTI-TENANCY ISSUES

### Executive Context Problems
- **Symptom**: "No executive_id found in request" or "Invalid executive context"
- **Root Cause**: Missing `x-executive-id` header in API calls
- **Fix**: Add `'x-executive-id': getExecutiveId()` to all API call headers

### Test Navigation Issues
- **Symptom**: Test can't find records or gets wrong data
- **Root Cause**: Missing `executive_id` query parameter in navigation URLs
- **Fix**: Include `&executive_id=${this.testExecutiveId}` in all test navigation

### Middleware Context Issues
- **Symptom**: API returns 401 or wrong data
- **Root Cause**: Middleware not setting executive context properly
- **Fix**: Ensure middleware extracts from headers first, query params as fallback

## SUCCESS METRICS
- Tests pass on first re-run after fixes
- No more than 2 iterations per test case
- User satisfaction with debugging efficiency
- Clear identification of root causes before fixes

## ANTI-PATTERNS TO AVOID

1. **Debug Loop Anti-Pattern**: Running same test repeatedly without analysis
2. **Symptom Fixing Anti-Pattern**: Adding logging instead of fixing functionality
3. **Working Test Anti-Pattern**: Running tests that already pass
4. **Instruction Ignoring Anti-Pattern**: Not following specific user guidance
5. **Assumption Anti-Pattern**: Guessing what's wrong instead of analyzing

## ENFORCEMENT
- Every test failure must be analyzed before re-running
- User instructions take priority over agent assumptions
- Focus on broken functionality only
- Document root cause analysis in comments