# Debugging Checklist

## Initial Assessment
- [ ] Issue clearly reproduced
- [ ] Error messages captured
- [ ] Environment details documented
- [ ] Recent changes identified

## Information Gathering
- [ ] Log files reviewed
- [ ] Database state checked
- [ ] Network connectivity verified
- [ ] Dependencies status confirmed
- [ ] Configuration validated

## Systematic Investigation
- [ ] Isolate the problem area
- [ ] Create minimal reproduction case
- [ ] Test with different inputs
- [ ] Check boundary conditions
- [ ] Verify assumptions

## Root Cause Analysis
- [ ] Trace execution flow
- [ ] Identify failure point
- [ ] Understand why it fails
- [ ] Document root cause
- [ ] Assess impact scope

## Solution Development
- [ ] Design fix approach
- [ ] Consider side effects
- [ ] Plan testing strategy
- [ ] Implement solution
- [ ] Verify fix works

## Validation
- [ ] Original issue resolved
- [ ] No regressions introduced
- [ ] Edge cases tested
- [ ] Performance impact assessed
- [ ] Documentation updated

## Prevention
- [ ] Add tests to prevent regression
- [ ] Update monitoring/alerting
- [ ] Document lessons learned
- [ ] Update processes if needed
- [ ] Share knowledge with team

## Common Debugging Techniques

### Logging
- Add strategic log statements
- Use appropriate log levels
- Include relevant context
- Remove debug logs before commit

### Testing
- Write failing test first
- Test individual components
- Use debugger effectively
- Test with real data

### Code Review
- Review recent changes
- Check for typos and logic errors
- Verify error handling
- Validate assumptions

### Environment
- Compare working vs broken environments
- Check configuration differences
- Verify dependency versions
- Test in clean environment