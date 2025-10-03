---
description: Design phase workflow for feature development
---

# Design Phase Workflow

This workflow guides agents through the design phase of feature development.

## Prerequisites
- Issue exists with `phase:design` label
- Feature specification completed (if applicable)
- Branch created for the issue

## Steps

### 1. Analysis and Research
// turbo
```bash
# Analyze the codebase to understand current architecture
grep_search --SearchPath src --Query "relevant_pattern" --IsRegex true
```

- Review existing code patterns and architecture
- Identify integration points and dependencies
- Research best practices and design patterns
- Document findings and constraints

### 2. Design Document Creation

- Create comprehensive design document covering:
  - Architecture overview
  - Component interactions
  - Data flow diagrams
  - API specifications
  - Database schema changes
  - Security considerations
  - Performance implications

### 3. Validation and Prototyping

- Build proof-of-concept to validate approach
- Test critical assumptions
- Identify potential issues early
- Refine design based on learnings

### 4. Review and Approval

- Submit design for review
- Address feedback and iterate
- Get stakeholder approval
- Update issue status to `status:needs-review`

### 5. Evidence Collection

- Use `.ai-agents/templates/evidence/Design-Evidence.md`
- Document all design decisions and rationale
- Include validation results and test outcomes
- Link to relevant documentation and prototypes

## Completion Criteria

- [ ] Design document completed and approved
- [ ] Proof-of-concept validates approach
- [ ] All stakeholder concerns addressed
- [ ] Evidence template filled out completely
- [ ] Issue tagged with `status:complete`

## Next Phase

Once design is approved, move to implementation phase by updating issue label to `phase:impl`.