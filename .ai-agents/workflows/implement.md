---
description: Implementation phase workflow for feature development
---

# Implementation Phase Workflow

This workflow guides agents through the implementation phase of feature development.

## Prerequisites
- Issue exists with `phase:impl` label
- Design document approved
- Test plan created (if applicable)
- Branch created for the issue

## Steps

### 1. Environment Setup
// turbo
```bash
# Start development server with timeout
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 3600 -- npm run dev &
```

- Set up development environment
- Install dependencies
- Configure development tools
- Verify build process works

### 2. Implementation

- Follow approved design document
- Implement core functionality first
- Add error handling and edge cases
- Include proper logging and monitoring
- Follow coding standards and best practices

### 3. Testing

// turbo
```bash
# Run tests with timeout
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 300 -- npm test
```

- Write unit tests for new functionality
- Create integration tests for workflows
- Add end-to-end tests if needed
- Ensure all tests pass
- Verify no regressions introduced

### 4. Code Review Preparation

- Clean up code and remove debug statements
- Update documentation
- Ensure commit messages are clear
- Run final test suite
- Update issue status to `status:needs-review`

### 5. Evidence Collection

- Use appropriate evidence template:
  - `.ai-agents/templates/evidence/Implementation-FeatureEvidence.md` for features
  - `.ai-agents/templates/evidence/Implementation-BugEvidence.md` for bug fixes
- Document implementation decisions
- Include test results and coverage
- Link to relevant code changes

## Completion Criteria

- [ ] All functionality implemented according to design
- [ ] Comprehensive tests written and passing
- [ ] Code review completed and approved
- [ ] Documentation updated
- [ ] Evidence template filled out completely
- [ ] Issue tagged with `status:complete`

## Quality Gates

- All tests must pass
- Code coverage meets project standards
- No security vulnerabilities introduced
- Performance requirements met
- Accessibility standards followed (if applicable)

## Next Steps

Once implementation is complete and approved:
1. Merge to master branch
2. Deploy to staging/production
3. Monitor for issues
4. Close the issue