# Successful Debugging Patterns

## INTENT
Establish systematic debugging approaches that convert challenges into learning opportunities and prevent recurring issues through comprehensive testing and documentation.

## PRINCIPLES
- **Systematic Approach**: Follow structured debugging methodology
- **Evidence-Based**: Document findings with concrete evidence
- **Learning Focus**: Convert every debug session into reusable knowledge
- **Test-Driven**: Create tests that prevent regression
- **Pattern Recognition**: Identify and document common failure modes

## SYSTEMATIC DEBUGGING METHODOLOGY

### 1. Issue Reproduction
**Goal**: Create reliable, repeatable failure conditions

**Steps**:
1. Document exact steps to reproduce
2. Identify minimum conditions for failure
3. Create automated reproduction script
4. Verify reproduction works consistently
5. Document environment and dependencies

### 2. Evidence Collection
**Goal**: Gather comprehensive data about the failure

**Steps**:
1. Collect error messages and stack traces
2. Review relevant logs with timestamps
3. Document system state at failure time
4. Capture network requests/responses
5. Record configuration and environment details

### 3. Root Cause Analysis
**Goal**: Identify the underlying cause, not just symptoms

**Steps**:
1. Trace execution flow to failure point
2. Examine code logic and data flow
3. Identify assumptions that may be incorrect
4. Check for race conditions or timing issues
5. Validate external dependencies

### 4. Solution Development
**Goal**: Create targeted fix that addresses root cause

**Steps**:
1. Design minimal fix for root cause
2. Consider impact on other system components
3. Plan rollback strategy if needed
4. Implement fix with proper error handling
5. Add monitoring/logging for future detection

### 5. Validation and Testing
**Goal**: Ensure fix works and doesn't break anything else

**Steps**:
1. Verify original issue is resolved
2. Run comprehensive test suite
3. Test edge cases and error conditions
4. Validate performance impact
5. Confirm no new issues introduced

## SPECIFIC DEBUGGING TECHNIQUES

### Code Analysis and Understanding

**CRITICAL: Always Analyze Before Implementing**
Before making any changes, use tools to understand the current codebase:

```bash
# Find all files that import a specific module
grep_search --SearchPath src --Query \"import.*ApiService\" --IsRegex true --MatchPerLine true

# Find files by pattern
find_by_name --SearchDirectory src --Pattern \"*service*\" --Type file

# Read specific files to understand implementation
Read --file_path src/services/api-service.ts
```

**Pattern Analysis Requirements:**
1. **Examine existing patterns** in the codebase (e.g., ServiceBase pattern)
2. **Use grep_search** to find all dependencies and usage
3. **Read actual implementations** to understand current architecture
4. **Document findings** with real code examples and line numbers

### Database Validation Scripts

**Database State Validation:**
```typescript
const { DatabaseService } = require('./src/services/database-service');

async function checkDatabaseState() {
  console.log('🔍 Checking database state...');
  const dbService = new DatabaseService();
  await dbService.initialize();

  try {
    // Check for tokens
    const tokens = await dbService.getTokens('primary');
    console.log('📋 Tokens found:', !!tokens);
    
    // Check for data
    const records = await dbService.getAllRecords();
    console.log('📊 Records found:', records.length);
    
    // Check for specific data
    const config = await dbService.getConfig('APP_CLIENT_ID');
    console.log('🔑 Config found:', !!config);
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await dbService.close();
  }
}
```

**API Endpoint Testing:**
```typescript
async function testAPIEndpoints() {
  const baseUrl = 'http://localhost:3000';
  
  // Test main API
  try {
    const response = await fetch(`${baseUrl}/api/data?start=2024-01-01&end=2024-01-02`);
    const data = await response.json();
    console.log('📊 Data API:', response.status, data);
  } catch (error) {
    console.error('❌ Data API failed:', error);
  }
  
  // Test status API
  try {
    const response = await fetch(`${baseUrl}/api/status`);
    const data = await response.json();
    console.log('💬 Status API:', response.status, data);
  } catch (error) {
    console.error('❌ Status API failed:', error);
  }
}
```

## COMMON DEBUGGING SCENARIOS

### Authentication Issues
**Symptoms**: 401 errors, token validation failures
**Common Causes**:
- Expired tokens not being refreshed
- Missing authentication headers
- Incorrect token format or encoding
- Clock skew between systems

**Debugging Steps**:
1. Verify token expiration times
2. Check token refresh logic
3. Validate authentication headers
4. Test with known-good tokens

### API Integration Issues
**Symptoms**: Network errors, unexpected responses
**Common Causes**:
- Rate limiting
- API version mismatches
- Incorrect request formatting
- Network connectivity issues

**Debugging Steps**:
1. Check API documentation for changes
2. Verify request format and headers
3. Test with API debugging tools
4. Monitor rate limits and quotas

### Database Connection Issues
**Symptoms**: Connection timeouts, query failures
**Common Causes**:
- Connection pool exhaustion
- Database server issues
- Network connectivity problems
- Query performance issues

**Debugging Steps**:
1. Check connection pool status
2. Verify database server health
3. Analyze slow query logs
4. Test connection from different environments

## LEARNING AND DOCUMENTATION

### Issue Documentation Template
```markdown
# Debug Session: [Issue Title]

## Problem Description
[Clear description of the issue]

## Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Expected vs Actual behavior]

## Investigation Process
- **Hypothesis 1**: [What you thought might be wrong]
  - **Test**: [How you tested it]
  - **Result**: [What you found]
- **Hypothesis 2**: [Next theory]
  - **Test**: [How you tested it]
  - **Result**: [What you found]

## Root Cause
[The actual underlying cause]

## Solution
[What you changed to fix it]

## Prevention
- **Tests Added**: [New tests to prevent regression]
- **Monitoring Added**: [New alerts or logging]
- **Documentation Updated**: [What docs were improved]

## Lessons Learned
[Key insights for future debugging]
```

### Creating Regression Tests
**Always create tests that would have caught the bug:**

```typescript
describe('Bug Fix: [Issue Description]', () => {
  it('should handle [specific failure condition]', async () => {
    // Arrange: Set up the exact conditions that caused the bug
    const testData = createTestConditions();
    
    // Act: Perform the action that previously failed
    const result = await performAction(testData);
    
    // Assert: Verify the fix works
    expect(result).toBeDefined();
    expect(result.status).toBe('success');
  });
  
  it('should not break existing functionality', async () => {
    // Regression test to ensure fix doesn't break other features
    const existingFlow = await testExistingWorkflow();
    expect(existingFlow).toMatchSnapshot();
  });
});
```

## ESCALATION PATTERNS

### When to Escalate
- Issue persists after 2+ hours of systematic debugging
- Root cause requires architectural changes
- Issue affects production systems
- Solution requires expertise outside your domain

### How to Escalate
1. **Document everything**: Provide complete investigation history
2. **Be specific**: Include exact error messages and reproduction steps
3. **Show your work**: Explain what you've tried and why
4. **Suggest options**: Propose potential solutions if you have ideas
5. **Set context**: Explain business impact and urgency

### Escalation Template
```markdown
# Escalation: [Issue Title]

## Summary
[Brief description of the problem]

## Business Impact
- **Affected Users**: [Who is impacted]
- **Severity**: [Critical/High/Medium/Low]
- **Timeline**: [When this needs to be resolved]

## Investigation Summary
- **Time Spent**: [Hours invested]
- **Approaches Tried**: [List of debugging attempts]
- **Current Status**: [Where you're stuck]

## Technical Details
- **Error Messages**: [Exact error text]
- **Reproduction Steps**: [How to reproduce]
- **Environment**: [System details]

## Requested Help
- **Specific Question**: [What you need help with]
- **Suggested Approach**: [Your ideas, if any]
- **Resources Needed**: [Additional access, tools, etc.]
```

## CONTINUOUS IMPROVEMENT

### Post-Debug Review
After resolving any significant issue:
1. **Document the solution** in team knowledge base
2. **Update debugging runbooks** with new patterns
3. **Improve monitoring** to catch similar issues earlier
4. **Share learnings** with team in retrospectives
5. **Update automated tests** to prevent regression

### Pattern Recognition
Keep track of:
- **Common failure modes** in your system
- **Effective debugging techniques** for different issue types
- **Tools and commands** that consistently help
- **Environmental factors** that contribute to issues
- **Time patterns** when issues typically occur

This systematic approach ensures that every debugging session contributes to the overall system reliability and team knowledge.