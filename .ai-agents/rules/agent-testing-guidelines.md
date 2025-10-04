# AI Agent Testing & Validation Guidelines

## INTENT
To ensure all work is thoroughly validated. To ensure agents provide **real, reproducible, end‑to‑end evidence** that fixes work — never "looks good" claims.

## MANDATORY PRINCIPLES
- **Reproduce → Fix → Prove**: Show failing evidence first, then passing evidence after the fix.
- **Test what matters**: Follow the test plan. Test the functionality that you have changed. Do not mock core functionality being tested.
- **Keep it simple**: Tests must be minimal but complete, covering all relevant scenarios. Use boilerplate tests and mocks to reduce duplication. 
- **Be complete**: No Placeholder Tests `// TODO` or empty/disabled test bodies are forbidden. Do not assume failing test cases are not important. Always watch for server logs for errors.
- **Be efficient**: Tests should create objects they need, test core functionality, then delete any objects they create, close server/database connections.
- **Be resilient**: When a tool fails, investigate alternative approaches before giving up. Check for existing working examples in the project before claiming a tool is broken.
- **Be truthful**: NEVER CLAIM SUCCESS WITHOUT RUNNING TESTS. Always run tests and show results before claiming they pass.
- **Backup with Evidence, Not Assertions**: Include evidence of passing tests in the PR before submitting for review.


## CORE TESTING PROCEDURE

### 1. Analyze Before Implementing
**CRITICAL**: Always analyze the codebase thoroughly before making changes:
- Use `grep_search` to find all dependencies and usage patterns
- Use `find_by_name` to locate related files and patterns
- Use `Read` to understand existing implementations
- Document findings with real code examples and line numbers
- **NEVER** make changes based on assumptions

### 2. Identify Code Changes
Before committing, determine the full scope of files that have been modified, created, or deleted.

### 3. Locate Relevant Tests
- For each modified source file (e.g., in `src/`), search the codebase for corresponding test files
- Test files follow the naming convention `test-*.ts` or `*.test.ts`
- A good method is to search for test files that `import` or `require` the modified source file

### 4. Execute Tests
- Run the specific test files you have identified
- Use the `npm test -- <test-file-name.ts>` command to run individual tests
- If multiple modules are affected, run all relevant test files

### 5. Verify and Fix
- Carefully review the test output in `test.log` to understand and analyze test results. All tests must pass
- If any test fails, you MUST fix the underlying issue in the source code
- If you believe the failure is due to a test flaw, escalate to the user and get their permission to modify the test. Never modify existing tests without permission.
- Do not proceed with a commit until all related tests are passing
- Communicate with the user if you are stuck

### 6. Test Structure Requirements
- **MUST** use `BaseTestCase` from `test-utils.ts` for all test cases
- **MUST** include proper `tags` array (e.g., `['smoke']`). At least 1 smoke test must exist for every fix
- **MUST** follow the existing test structure patterns in the codebase
- **MUST** use `runTests()` function for test execution
- **MUST** provide clear test descriptions and expected outcomes
- **MUST** be minimal but complete, covering all relevant scenarios.
- **MUST** use boilerplate tests and mocks to reduce duplication. Test-Util.ts is the location for common test code.

### 7. Evidence
- **MUST** include evidence before submitting for review.
- **MUST** attach this evidence to the issue as a single comment with screenshots, logs, or any other relevant evidence to demonstrate the fix.
- **MUST** include in evidence which test cases were run, which ones passed, and reasons/analysis for any failures.
- **MUST** have run all relevant test suites as indicated in step #2.
- **MUST** have run `npm run test-smoke test*.ts` to ensure smoke tests are passing

## INTEGRATION TESTING ANTI-PATTERNS TO AVOID

### ❌ The "No Exceptions" Anti-Pattern
**NEVER write tests that only check for the absence of exceptions without validating actual behavior:**

```typescript
// BAD: Only checking for absence of exceptions
await actionOrchestrator.processHITLApproval(testRecord);
console.log('✅ Test passed - no exceptions thrown');
return true;
```

**What's Wrong:**
- No validation of actual behavior or outcomes
- No verification of side effects (database updates, service calls)
- No verification of service interactions
- False confidence - tests could pass even if functionality is completely broken

### ❌ Insufficient Mock Validation
**NEVER create mocks that don't capture and validate behavior:**

```typescript
// BAD: Mock that doesn't track calls
const mockDataService = {
  updateRecord: async () => ({ success: true })
};

// BAD: No validation of what was called
await actionOrchestrator.processHITLApproval(testRecord);
// No verification of service interactions!
```

## INTEGRATION TESTING BEST PRACTICES

### ✅ Enhanced Mock Services with Call Tracking
**ALWAYS create mocks that track method calls and parameters for validation:**

```typescript
// GOOD: Mock with call tracking
const createMockDataService = () => {
  const calls: any[] = [];
  return {
    calls, // Expose calls for validation
    updateRecord: async (request: any) => {
      calls.push({ method: 'updateRecord', request });
      return { success: true, recordId: request.recordId };
    }
  };
};
```

### ✅ Comprehensive Behavior Validation
**ALWAYS validate specific, measurable outcomes:**

```typescript
// GOOD: Validating actual behavior
const dataCalls = mockDataService.calls;
const updateCall = dataCalls.find(call => call.method === 'updateRecord');

if (!updateCall) {
  console.log('❌ Expected updateRecord to be called');
  return false;
}

const updateRequest = updateCall.request;
if (updateRequest.eventId !== 'expected-event-id') {
  console.log(`❌ Expected eventId 'expected-event-id', got '${updateRequest.eventId}'`);
  return false;
}

if (updateRequest.updates.summary !== 'Expected Summary') {
  console.log(`❌ Expected summary 'Expected Summary', got '${updateRequest.updates.summary}'`);
  return false;
}
```

### ✅ Multi-Service Validation Pattern
**ALWAYS validate interactions between multiple services:**

```typescript
// GOOD: Validate multiple service interactions
const validateServiceInteractions = (mocks: any) => {
  // Data Service Validation
  const dataCalls = mocks.dataService.calls;
  const updateCall = dataCalls.find(call => call.method === 'updateRecord');
  if (!updateCall || updateCall.request.recordId !== expectedRecordId) {
    throw new Error('Data service not called correctly');
  }

  // Notification Service Validation  
  const notificationCalls = mocks.notificationService.calls;
  const sendCall = notificationCalls.find(call => call.method === 'sendMessage');
  if (!sendCall || !sendCall.request.recipients.includes('expected@example.com')) {
    throw new Error('Notification service not called correctly');
  }

  // Database Service Validation
  const dbCalls = mocks.dbService.calls;
  const updateCall = dbCalls.find(call => call.method === 'updateReview');
  if (!updateCall || updateCall.request.status !== 'completed') {
    throw new Error('Database not updated correctly');
  }
};
```

### ✅ Behavior-Driven Test Design
**ALWAYS start with "What should this code do?" then "How can I verify it did that?":**

1. **Define Expected Behavior**: What should the code actually do?
2. **Identify Observable Outcomes**: How can you verify the behavior occurred?
3. **Create Validation Logic**: Write assertions that check the observable outcomes
4. **Test Edge Cases**: What could go wrong?

## TOOL TROUBLESHOOTING REQUIREMENTS

### When a Tool Fails
1. **Check for existing working examples** in the project before claiming a tool is broken
2. **Try alternative approaches** (e.g., direct library usage vs MCP tools)
3. **Investigate the root cause** rather than immediately giving up
4. **Use project-specific patterns** that are already proven to work

### Common Tool Issues and Solutions
- **MCP Tools failing**: Check if direct library usage is available (e.g., Playwright library vs MCP Playwright tools)
- **API endpoints not working**: Verify server is running, check logs, test with curl
- **Database operations failing**: Check connection, verify schema, test with existing working scripts
- **UI automation failing**: Look for existing test files that work, use them as templates

### Prohibited Tool Behavior
- **NEVER** give up on tool usage without investigating alternatives
- **NEVER** claim a tool is broken without checking for working examples
- **NEVER** suggest manual work when automated approaches are available
- **NEVER** abandon testing due to tool issues without exhausting alternatives

## CRITICAL FAILURE PATTERNS TO AVOID

### ❌ The "Claim Success Without Running Tests" Anti-Pattern
**NEVER claim tests are passing without actually running them:**
- **What Happened**: Agent claimed "tests are good" without running them
- **User Response**: "are you serious? every test except 1 passed and youre saying its good?"
- **Impact**: False confidence, ignored real failures, wasted time
- **Prevention**: Always run tests and show results before claiming success

### ❌ The "Ignore User Feedback" Anti-Pattern
**NEVER argue when user corrects mistakes:**
- **What Happened**: User had to correct agent multiple times about same issues
- **User Response**: "are you lying to me? see the tooltip test!! again, please review agent instructions"
- **Impact**: Lost trust, frustrated user, repeated same mistakes
- **Prevention**: Accept feedback immediately, don't argue, learn from corrections

### ❌ The "Mock What You're Testing" Anti-Pattern
**NEVER mock the core functionality you're supposed to test:**
- **What Happened**: Mocked `storeForHumanReview` method instead of testing the real implementation
- **User Response**: "you have mocked out the real thing being tested which is what is sent to the store function"
- **Impact**: Test didn't validate actual bug fix, was testing mock implementation
- **Prevention**: Test the real implementation, not mock implementations

### ❌ The "Ignore Database Issues" Anti-Pattern
**NEVER ignore database connection problems as acceptable:**
- **What Happened**: Ignored `MongoNotConnectedError` and Cosmos DB throughput limit errors
- **User Response**: "and youve confirmed the tests are all passing?"
- **Impact**: Claimed tests were working when they were actually failing
- **Prevention**: Database issues are test failures, not acceptable

### ❌ The "Weak Test Validation" Anti-Pattern
**NEVER write tests that only check presence/absence:**
- **What Happened**: Wrote tests that checked if fields were not empty instead of validating actual content
- **User Response**: "if the rules about this aren't already clear, please help clarify them... what you have done is an antipattern"
- **Impact**: Tests didn't validate real behavior, missed actual bugs
- **Prevention**: Always validate actual content, not just presence/absence

## PROHIBITED
- Changing tests/success criteria to create a pass.
- Declaring "tested" without including artifacts.
- Relying only on mocked tests for e2e behavior.
- Leaving TODOs/placeholders in any test file.
- Mocking the core functionality that needs to be validated.
- Changing existing test cases without permission.
- **Writing tests that only check for absence of exceptions**
- **Creating mocks that don't validate actual behavior**
- **Not verifying service interactions and side effects**
- **Giving up on tool usage without investigating alternatives**
- **Claiming tests pass without running them**
- **Arguing when user corrects mistakes**
- **Mocking what you're supposed to test**
- **Ignoring database connection issues**
- **Writing weak tests that only check presence/absence**

### 7. Provide evidence
- **MUST** include a table in the PR comments with the following - test, pass/fail, analysis of why failed (if failed)

## MANDATORY VERIFICATION REQUIREMENTS

### UI Changes
- **MUST** open browser and test UI functionality
- **MUST** test actual user interactions (clicks, forms, etc.)
- **MUST** verify UI loads without errors
- **MUST** author 1 e2e test case without mocking anything

### Database Changes  
- **MUST** verify database schema compatibility
- **MUST** test actual database operations
- **MUST** verify column mapping is correct
- **MUST** test with real database, not just mocks

### Issue Resolution
- **MUST** reproduce the original issue first
- **MUST** demonstrate the issue is actually fixed
- **MUST** test related scenarios to ensure no regressions
- **MUST** provide evidence of successful resolution

### Test Execution
- **MUST** run all relevant tests and verify they pass
- **MUST** fix any test failures that were not present before
- **MUST** provide test output as evidence
- **MUST** verify tests actually test the functionality

### Git Workflows
- **MUST** verify Git workflows completed successfully (not just started)
- **MUST** check PR status, branch status, merge status
- **MUST** confirm expected outcomes occurred

## MANDATORY COMPLETENESS VERIFICATION

### **CRITICAL: Before Declaring Work Complete**
Every agent **MUST** perform this comprehensive verification checklist:

#### **1. Compilation Verification**
- **MUST** run `npx tsc --noEmit --skipLibCheck` and verify 0 errors
- **MUST** run `npm run build` (if build script exists) and verify success
- **MUST** fix any TypeScript compilation errors before proceeding
- **NEVER** ignore compilation errors or assume they're unrelated

#### **2. Comprehensive Search Verification**
When refactoring or removing dependencies, **MUST** use multiple search strategies:
```bash
# Search for class/interface names
grep_search --SearchPath . --Query "ClassName" --MatchPerLine true

# Search for import statements  
grep_search --SearchPath . --Query "import.*ClassName" --IsRegex true --MatchPerLine true

# Search for file references
grep_search --SearchPath . --Query "filename" --MatchPerLine true

# Search for method calls
grep_search --SearchPath . --Query "methodName" --MatchPerLine true
```

#### **3. Build System Verification**
- **MUST** verify the entire system builds without errors
- **MUST** check that all imports resolve correctly
- **MUST** verify no broken dependencies exist
- **MUST** test that the application starts without compilation errors

#### **4. End-to-End Functionality Verification**
- **MUST** verify the main application functionality still works
- **MUST** test critical user workflows end-to-end
- **MUST** verify no regressions in existing functionality
- **MUST** test with real data, not just mocks

#### **5. Dependency Impact Analysis**
When changing core services or interfaces:
- **MUST** identify ALL files that depend on the changed code
- **MUST** verify each dependent file still works correctly
- **MUST** update ALL references to use new patterns/interfaces
- **MUST** verify no orphaned code or broken imports remain

### **PROHIBITED COMPLETENESS ANTI-PATTERNS**

#### **❌ The "Partial Search" Anti-Pattern**
**NEVER** search for only one pattern when multiple exist:
```bash
# BAD: Only searching for imports
grep_search "import.*GmailService"

# GOOD: Comprehensive search
grep_search "GmailService"           # All references
grep_search "gmail-service"          # File references  
grep_search "import.*GmailService"   # Import statements
npx tsc --noEmit                     # Compilation check
```

#### **❌ The "Assume It Works" Anti-Pattern**
**NEVER** assume changes work without verification:
- **BAD**: "I updated the imports, should work now"
- **GOOD**: Run compilation, run tests, verify functionality

#### **❌ The "Ignore Compilation Errors" Anti-Pattern**
**NEVER** ignore TypeScript errors:
- **BAD**: "There are some TS errors but they're probably unrelated"
- **GOOD**: Fix ALL compilation errors before declaring work complete

#### **❌ The "Skip Build Verification" Anti-Pattern**
**NEVER** skip verifying the system builds:
- **BAD**: "Code looks right, tests pass, must be good"
- **GOOD**: Run `npm run build` and verify success

## TESTING COMMANDS
- `npm run test <file>.ts` to run all tests
- `npm run test-smoke <file>.ts` for smoke tests
- `npm run test-flaky <file>.ts` for flaky tests
- `npm run test-failing <file>.ts` for failing tests
- `npm run test-baml <file>.ts` for BAML tests

## EXAMPLES

### Good: Comprehensive Verification
```
Action: Fixed login button
Verification: 
- Opened browser, clicked button, verified login works
- Took screenshot showing successful login
- Ran tests: npm test -- test-login.ts ✅ PASSED
- Verified no regressions in other login flows
Evidence: Screenshot + test output provided
```

### Bad: Assumption-Based Work
```
Action: Fixed login button
Verification: "Code looks correct, should work"
Evidence: None provided
```

### Good: Database Verification
```
Action: Added new user field
Verification:
- Updated database schema
- Tested actual database write/read operations
- Verified column mapping is correct
- Ran: npm test -- test-db-schema-lifecycle.ts ✅ PASSED
Evidence: Database operation results + test output
```

### Bad: Code-Only Changes
```
Action: Added new user field
Verification: "Added field to TypeScript interface"
Evidence: None - didn't test actual database operations
```

### Good: Proper Test Structure
```typescript
import { BaseTestCase, runTests } from './test-utils';

interface MyTestCase extends BaseTestCase {
  description: string;
  testFunction: () => Promise<boolean>;
}

const MY_TEST_CASES: MyTestCase[] = [
  {
    name: 'test_user_field_creation',
    tags: ['smoke'],
    description: 'Should create user field and verify database operations',
    testFunction: async () => {
      // Test implementation
      return true;
    }
  }
];

const runMyTest = async (testCase: MyTestCase) => {
  doSetup(); // any mocking, object creation, etc.
  const result = testCoreFunctionality();
  doTeardown(); // remove any created objects, etc.
  return result;
};

runTests(MY_TEST_CASES, runMyTest, 'My Test Suite');
```

### Bad: Incorrect Test Structure
```typescript
// DON'T: Direct test execution without proper structure
describe('My Tests', () => {
  it('should work', () => {
    // Test implementation
  });
});
```


## VERIFICATION CHECKLIST
Before starting work:
- [ ] Understand the issue and its reproduction steps
- [ ] Able to reproduce the issue
- [ ] Identify relevant test cases

While debugging test failures
- [ ] Run the single test that repros the issue (set tag failing and run using `npm run test-flaky <tesuite>`)
- [ ] Read test output to understand WHY it failed
- [ ] Identify specific error messages or assertions
- [ ] Determine if it's configuration, data, or functionality issue
- [ ] Plan specific fix before re-running the single failing test
- [ ] Once fixed, run the entire suite (remove tag failing and run using `npm run test <testsuite>`)

Before marking any work complete:
- [ ] **COMPILATION**: `npx tsc --noEmit --skipLibCheck` shows 0 errors
- [ ] **BUILD**: `npm run build` completes successfully (if build script exists)
- [ ] **COMPREHENSIVE SEARCH**: Used multiple search patterns to find ALL references
- [ ] **DEPENDENCY ANALYSIS**: Verified ALL dependent files still work
- [ ] **IMPORTS**: All imports resolve correctly, no broken dependencies
- [ ] UI changes tested in actual browser
- [ ] Database changes tested with real operations
- [ ] Issue reproduction and resolution demonstrated
- [ ] All relevant tests pass with evidence
- [ ] Core functionality tested
- [ ] No regressions introduced
- [ ] Git workflows verified successful
- [ ] Evidence provided in GitHub issue



## ITERATIVE TESTING PATTERNS & ANTI-PATTERNS THAT AGENTS HAVE LEARNED

### ✅ **SUCCESSFUL TESTING PATTERNS**

#### **1. Multi-Layer Verification Pattern**
**Pattern**: Test at every layer when fixing issues
- **Database Layer**: Verify data is stored correctly with proper IDs
- **API Layer**: Test endpoints return correct data structure
- **UI Layer**: Verify user interface displays and functions correctly
- **Integration Layer**: Test end-to-end workflows

**Example**: When fixing user preference issues:
1. Check database: `node check-preferences.js` → verify `user_id` field
2. Test API: `curl -H "x-user-id: user-001" /preferences` → verify response
3. Test UI: Use Playwright to navigate and interact → verify functionality
4. Test isolation: Switch users and verify data separation

#### **2. Root Cause Analysis Pattern**
**Pattern**: Don't just fix symptoms, identify and fix root causes
- **Symptom**: UI shows 404 errors
- **Surface Fix**: Update API endpoints
- **Root Cause**: UI still using old URL structure with `USER_ID` parameters
- **Complete Fix**: Update all UI API calls to use new authentication pattern

#### **3. Incremental Validation Pattern**
**Pattern**: Validate each fix before moving to the next
- Fix API endpoints → Test with curl → Verify response
- Fix UI calls → Test with Playwright → Verify functionality
- Test multi-tenancy → Verify isolation → Document results

#### **4. Data Consistency Verification Pattern**
**Pattern**: Always verify data consistency across systems
- **Data Design**: Ensure `Record.id` vs `Record.recordId` vs `Token.recordId` consistency
- **User Context**: Verify `user_id` is used consistently across all APIs
- **Database Queries**: Ensure query fields match stored data fields

#### **5. User-Centric Testing Pattern**
**Pattern**: Test from user perspective, not just technical perspective
- **User Journey**: Can user add preferences? Can they see their data?
- **Multi-User**: Can different users see only their own data?
- **Error Handling**: Are error messages user-friendly?

### ❌ **COMMON ANTI-PATTERNS TO AVOID**

#### **1. Premature Victory Declaration**
**Anti-Pattern**: Claiming success after only partial testing
- **Wrong**: "Fixed the API, it's working!" (only tested with curl)
- **Right**: "Fixed API, tested with curl, now testing UI with Playwright"

#### **2. Single-Layer Testing**
**Anti-Pattern**: Only testing one layer (e.g., just API or just UI)
- **Wrong**: "API works, UI should work too"
- **Right**: "API works, now let me test UI to verify"

#### **3. Assumption-Based Fixes**
**Anti-Pattern**: Making changes based on assumptions without verification
- **Wrong**: "The UI probably uses the same API structure"
- **Right**: "Let me check the UI code to see how it calls the API"

#### **4. Incomplete Multi-Tenancy Testing**
**Anti-Pattern**: Only testing one user
- **Wrong**: "User1 can see their preferences, multi-tenancy works"
- **Right**: "User1 sees their preferences, User2 sees empty list, isolation confirmed"

#### **5. Database Assumption Anti-Pattern**
**Anti-Pattern**: Assuming database structure without verification
- **Wrong**: "The database probably stores it as `userId`"
- **Right**: "Let me check the database to see the actual field names"