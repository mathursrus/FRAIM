---
description: Retrospective workflow for learning from completed work
---

# Retrospective Workflow

This workflow guides agents through conducting retrospectives on completed work to capture learnings and improve processes.

## When to Use
- After completing major features
- After resolving complex issues
- After encountering significant challenges
- Periodically (weekly/monthly)
- After project milestones

## Steps

### 1. Data Collection

// turbo
```bash
# Gather metrics and logs
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 60 -- npm run gather-metrics
```

- Collect performance metrics
- Review error logs and issues
- Gather user feedback
- Analyze development velocity
- Review code quality metrics

### 2. What Went Well

- Identify successful practices
- Document effective tools and techniques
- Highlight good decisions
- Recognize efficient processes
- Note positive outcomes

### 3. What Could Be Improved

- Identify pain points and bottlenecks
- Document recurring issues
- Note inefficient processes
- Identify knowledge gaps
- Highlight areas for optimization

### 4. Action Items

- Create specific, actionable improvements
- Assign ownership and timelines
- Update processes and documentation
- Plan training or knowledge sharing
- Schedule follow-up reviews

### 5. Knowledge Capture

- Update agent rules and workflows
- Create or update templates
- Document best practices
- Share learnings with team
- Update troubleshooting guides

## Template Structure

```markdown
# Retrospective: [Project/Issue Name]
Date: [Date]
Participants: [List]

## What Went Well
- [Item 1]
- [Item 2]

## What Could Be Improved
- [Item 1]
- [Item 2]

## Action Items
- [ ] [Action 1] - Owner: [Name] - Due: [Date]
- [ ] [Action 2] - Owner: [Name] - Due: [Date]

## Learnings
- [Learning 1]
- [Learning 2]

## Process Updates
- [Update 1]
- [Update 2]
```

## Completion Criteria

- [ ] All stakeholders participated
- [ ] Key learnings documented
- [ ] Action items created with owners
- [ ] Process improvements identified
- [ ] Knowledge base updated

## Follow-up

- Schedule action item reviews
- Monitor implementation of improvements
- Measure impact of changes
- Plan next retrospective
- Share learnings across teams