---
description: Testing phase workflow for feature development
---

# Testing Phase Workflow

This workflow guides agents through the testing phase of feature development.

## Prerequisites
- Issue exists with `phase:tests` label
- Design document approved
- Implementation plan defined
- Branch created for the issue

## Steps

### 1. Test Planning

- Review requirements and design
- Identify test scenarios and cases
- Plan test data requirements
- Define test environments
- Create test execution strategy

### 2. Test Case Development

// turbo
```bash
# Run existing tests to understand patterns
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 300 -- npm test
```

- Write unit test cases
- Create integration test scenarios
- Develop end-to-end test flows
- Design performance test cases
- Plan security test scenarios

### 3. Test Implementation

- Implement unit tests
- Create integration tests
- Build end-to-end test automation
- Set up performance testing
- Configure security testing

### 4. Test Execution

// turbo
```bash
# Execute comprehensive test suite
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 1800 -- npm run test-comprehensive
```

- Run all test suites
- Execute manual test scenarios
- Perform exploratory testing
- Validate edge cases
- Test error conditions

### 5. Results Analysis

- Analyze test results
- Document defects found
- Assess test coverage
- Evaluate performance metrics
- Review security findings

### 6. Test Documentation

- Document test cases and procedures
- Create test execution reports
- Update test maintenance guides
- Document known issues
- Create troubleshooting guides

## Test Types

### Unit Tests
- Test individual components
- Mock dependencies
- Fast execution
- High code coverage

### Integration Tests
- Test component interactions
- Use real dependencies where possible
- Validate data flow
- Test API contracts

### End-to-End Tests
- Test complete user workflows
- Use production-like environment
- Validate user experience
- Test critical business paths

### Performance Tests
- Load testing
- Stress testing
- Volume testing
- Scalability testing

### Security Tests
- Authentication testing
- Authorization testing
- Input validation testing
- Vulnerability scanning

## Completion Criteria

- [ ] All test cases implemented
- [ ] Test suite execution successful
- [ ] Coverage targets met
- [ ] Performance requirements validated
- [ ] Security requirements verified
- [ ] Test documentation complete
- [ ] Issue tagged with `status:complete`

## Quality Gates

- Test coverage >= 80%
- All critical paths tested
- Performance within acceptable limits
- No high-severity security issues
- All tests automated where possible

## Next Phase

Once testing is complete, move to implementation phase by updating issue label to `phase:impl`.