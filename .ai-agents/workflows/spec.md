---
description: Specification phase workflow for feature development
---

# Specification Phase Workflow

This workflow guides agents through the specification phase of feature development.

## Prerequisites
- Issue exists with `phase:spec` label
- Problem statement clearly defined
- Stakeholders identified
- Branch created for the issue

## Steps

### 1. Requirements Gathering

// turbo
```bash
# Analyze existing codebase for context
grep_search --SearchPath . --Query "related_functionality" --IsRegex true
```

- Interview stakeholders
- Gather functional requirements
- Identify non-functional requirements
- Document constraints and assumptions
- Research existing solutions

### 2. Specification Document Creation

- Create comprehensive specification covering:
  - Problem statement and context
  - User stories and use cases
  - Functional requirements
  - Non-functional requirements (performance, security, etc.)
  - Success criteria and acceptance criteria
  - Dependencies and integration points
  - Risk assessment
  - Timeline and milestones

### 3. Stakeholder Review

- Present specification to stakeholders
- Gather feedback and iterate
- Resolve conflicts and ambiguities
- Ensure all requirements captured
- Get formal approval

### 4. Technical Feasibility

- Assess technical complexity
- Identify potential challenges
- Estimate effort and resources
- Plan implementation approach
- Document technical constraints

### 5. Evidence Collection

- Use `.ai-agents/templates/evidence/Spec-Evidence.md`
- Document all requirements and decisions
- Include stakeholder feedback and approvals
- Link to relevant research and analysis
- Record assumptions and risks

## Completion Criteria

- [ ] All requirements clearly documented
- [ ] Stakeholder approval obtained
- [ ] Technical feasibility confirmed
- [ ] Success criteria defined
- [ ] Evidence template completed
- [ ] Issue tagged with `status:complete`

## Quality Gates

- Requirements are specific and measurable
- Acceptance criteria are testable
- Dependencies are identified
- Risks are assessed and mitigated
- Timeline is realistic

## Next Phase

Once specification is approved, move to design phase by updating issue label to `phase:design`.