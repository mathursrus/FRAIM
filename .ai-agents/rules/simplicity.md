# Simplicity

## INTENT
To maintain code quality and development velocity by preventing over-engineering, ensuring agents focus on solving the specific problem at hand rather than building unnecessary complexity.

## PRINCIPLES
- Keep it simple. Don't over-engineer.
- Don't over-think it.
- Focus on the assigned issue only.
- Don't fix other issues or make unrelated changes.

## REQUIREMENTS
- While fixing an issue, focus on that issue only
- Don't fix other issues or make unrelated changes
- If you find other issues that must be fixed, include them in your final report as a suggested Git issue
- Don't over-engineer solutions
- Choose the simplest approach that solves the problem
- **NEVER use placeholder comments** like "For now", "TODO", "FIXME", or "This is a placeholder"
- **ALWAYS implement complete solutions** - if something needs to be customized later, implement it properly with clear configuration

## PROTOTYPE-FIRST DEVELOPMENT PATTERN

### Core Principle
**Always prototype the end-to-end solution manually before engineering it correctly.**

### Development Flow
1. **Prototype**: Build simplest possible solution that works end-to-end
2. **Manual Validation**: Test each step manually using browser/API calls
3. **Verify**: Confirm everything works before creating automated tests
4. **Engineer**: Refactor to production quality once proven to work
5. **Automate**: Create Playwright tests only after manual validation

### Anti-Patterns to Avoid
- ❌ **"Assume It Works"**: Creating tests before manual validation
- ❌ **"Over-Engineer First"**: Building complex architecture before proving simple solution works
- ❌ **"Test-Driven Over-Engineering"**: Writing comprehensive test suites for unproven solutions
- ❌ **"Band-Aid Fixes"**: Adding delays, retries, workarounds instead of fixing root cause
- ❌ **"Resource Waste"**: Running expensive operations repeatedly without analyzing failures

### Validation Requirements
- **Manual Testing**: Use browser/curl to test each step manually
- **End-to-End Flow**: Verify complete user journey works
- **No Assumptions**: Don't assume anything works until manually verified
- **Simple First**: Start with simplest possible implementation
- **Prove Then Improve**: Only add complexity after proving simple version works

## RESOURCE WASTE PREVENTION
- Maximum 2 retries for expensive operations (Playwright, API calls, database)
- After 2 failures: STOP, analyze, propose different approach
- **STOP** if tests are consuming significant resources repeatedly
- **Manual validation required** before creating automated tests

## EXAMPLES

### Good: Prototype-First Development
```
Issue: "Add OAuth login"
Action: 
1. Built simple OAuth callback → JWT → redirect
2. Manually tested with browser (login → redirect → dashboard works)
3. Verified end-to-end flow works
4. Then created Playwright tests
Result: Working solution, no overengineering
```

### Bad: Over-Engineering First
```
Issue: "Add OAuth login"
Action: 
1. Built complex session management system
2. Created comprehensive test suite
3. Added session validation endpoints
4. Created infinite redirect loops
5. Added delays/retries to fix timing issues
Result: Over-engineered, resource waste, doesn't work
```

### Good: Manual Validation First
```
Issue: "Fix API endpoint"
Action: 
1. Fixed the code
2. Tested with curl to verify it works
3. Tested in browser to verify UI works
4. Then created automated tests
Result: Confident solution works before automation
```

### Bad: Assume It Works
```
Issue: "Fix API endpoint"
Action: 
1. Fixed the code
2. Created Playwright tests immediately
3. Tests fail because solution doesn't actually work
4. Keep retrying tests instead of fixing code
Result: Wasted resources, false confidence
```

### Good: Simple Solution
```
Issue: "Add error message for invalid email"
Action: Added single validation check with clear error message
Result: Clean, focused solution
```

### Bad: Complex Solution
```
Issue: "Add error message for invalid email"
Action: Built comprehensive validation framework with multiple error types, internationalization, and complex state management
Result: Over-engineered for simple requirement
```