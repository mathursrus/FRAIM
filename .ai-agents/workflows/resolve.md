---
description: Issue resolution workflow for completing and closing issues
---

# Issue Resolution Workflow

This workflow guides agents through the final steps of resolving and closing issues.

## Prerequisites
- Issue implementation completed
- All tests passing
- Code review approved
- Evidence collected and documented

## Steps

### 1. Final Validation

// turbo
```bash
# Run comprehensive test suite
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 600 -- npm run test-all
```

- Verify all acceptance criteria met
- Run full test suite
- Test in production-like environment
- Validate performance requirements
- Check security considerations

### 2. Documentation Updates

- Update API documentation
- Update user guides if needed
- Update deployment documentation
- Create/update troubleshooting guides
- Update changelog

### 3. Deployment Preparation

- Create deployment checklist
- Prepare rollback plan
- Update monitoring and alerting
- Coordinate with stakeholders
- Schedule deployment window

### 4. Issue Closure

- Update issue status to `status:complete`
- Add final summary comment
- Link to deployed feature/fix
- Close the issue
- Update project tracking

### 5. Post-Resolution Activities

- Monitor deployment for issues
- Gather user feedback
- Document lessons learned
- Update agent rules if needed
- Plan follow-up improvements

## Completion Criteria

- [ ] All acceptance criteria verified
- [ ] Documentation completely updated
- [ ] Deployment successful
- [ ] No critical issues detected
- [ ] Issue properly closed with summary

## Quality Assurance

- Feature/fix works as intended
- No regressions introduced
- Performance within acceptable limits
- Security requirements met
- User experience validated

## Continuous Improvement

- Document what worked well
- Identify areas for improvement
- Update processes and templates
- Share learnings with team
- Update agent rules and workflows