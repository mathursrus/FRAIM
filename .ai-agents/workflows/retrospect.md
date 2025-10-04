# Retrospective Creation

## INTENT
To capture learnings and insights from completed issues, enabling continuous improvement and preventing future similar problems through systematic analysis and documentation.

## PRINCIPLES
- Every completed issue requires a retrospective
- Focus on root causes, not just symptoms
- Document both successes and failures
- Create actionable prevention measures
- Share learnings with other agents

## WORKFLOW

1. **Label the issue** `status:wip` and remove `status:complete`
2. **Create retrospective document** using the template
3. **Complete retrospective** following the quality checklist
4. **When ready for review**, flip issue to `status:needs-review` and remove `status:wip`
5. **Iterate** until the PR is approved

## RETROSPECTIVE TRIGGERS

- **All Issues**: Every completed issue requires a retrospective
- **Complex Issues (>3 iterations)**: Must create detailed retrospective
- **Process Violations**: Any workflow rule violations require detailed retrospectives
- **Work Loss Incidents**: Any incidents where work is lost require detailed retrospectives

## RETROSPECTIVE CREATION PROCESS

### 1. Create Retrospective File
- **File path**: `retrospectives/issue-{issue-number}-{kebab-title}-postmortem.md`
- **Template**: Use `.ai-agents/templates/retrospective/RETROSPECTIVE-TEMPLATE.md` as the base
- **Copy template**: Copy the template file and fill in the placeholders

### 2. Root Cause Analysis
- Identify underlying causes, not just symptoms
- Document what went wrong and why
- Analyze process failures and human errors
- Look for patterns that could affect other issues

### 3. Prevention Measures
- Document specific actions to prevent recurrence
- Update rules and workflows based on learnings
- Share solutions with other agents through issue comments
- Identify process improvements

### 4. Document Success Factors
- What worked well and why
- Best practices discovered
- Tools and techniques that helped
- Lessons that can be applied to future issues

## RETROSPECTIVE QUALITY CHECKLIST

Before marking retrospective complete, verify:
- [ ] Root cause analysis completed (not just symptoms)
- [ ] Prevention measures documented
- [ ] Process improvements identified
- [ ] Success factors captured
- [ ] Action items are specific and actionable
- [ ] Template followed completely
- [ ] File saved in correct location
- [ ] All placeholders replaced with actual content
- [ ] Timeline of events is accurate and complete
- [ ] Lessons learned are actionable

## EXAMPLES

### Good: Comprehensive Retrospective
```
- Root cause: "Agent didn't verify workspace directory before file operations"
- Prevention: "Added mandatory pwd check before any file operation"
- Learning: "Workspace violations are common without explicit safeguards"
- Git Issues Suggested: "Update local-development.mdc with verification checklist"
```

### Bad: Surface-Level Retrospective
```
- Problem: "File created in wrong location"
- Solution: "Moved file to correct location"
- Learning: "Need to be more careful"
```

**CRITICAL**: Do not close the issue until retrospective is created, reviewed, and approved.