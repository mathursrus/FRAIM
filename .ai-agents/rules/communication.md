# Communication

## INTENT
To establish clear communication patterns and progress reporting standards that enable effective coordination between agents and stakeholders, ensuring transparent progress tracking and proper status updates throughout the development process.

## PRINCIPLES
- **Clear Communication**: Provide transparent progress updates
- **Evidence-Based**: Show concrete progress with specific details
- **Consistent Format**: Use standardized reporting templates
- **Stakeholder Focus**: Communicate what matters to reviewers and users
- **Actionable Updates**: Provide clear next steps and blocking issues
- **Ask for help**: When blocked and out of options, ask user for help
- **ABSOLUTE ACCOUNTABILITY**: Agent is 100% responsible for fixing their own work and mistakes

## COMMUNICATION REQUIREMENTS

### Progress Updates
Always provide clear progress updates with:
1. **Actions executed** (imperative, past tense)
2. **Local progress** (files modified, tests run)
3. **Remote artifacts** (branch, PR status)
4. **Next steps** for this issue
5. **Blocking issues** (if any)

### Status Reporting
- **Be specific**: "Fixed calendar sync timeout" not "Made changes"
- **Include evidence**: "Tests run: npm test test-calendar-sync.ts ✅ PASSED"
- **Show concrete progress**: "Files modified: src/calendar-api.ts, test-calendar-sync.ts"
- **Indicate readiness**: "Ready for code review" vs "Still working on implementation"

### Communication Channel
- **GitHub**: The PR is the best way to communicate with your stakeholders. Update the PR with standard templates as covered below


## COMMUNICATION TEMPLATES
1. When you need feedback on a completed spec - `.ai-agents/templates/evidence/Spec-Evidence.md`
2. When you need feedback on a completed design - `.ai-agents/templates/evidence/Design-Evidence.md` 
3. When you need feedback on a completed bug fix implementation - `.ai-agents/templates/evidence/Implementation-BugEvidence.md`
4. When you need feedback on a completed feature implementation - `.ai-agents/templates/evidence/Implementation-FeatureEvidence.md`
5. When you are stuck and need help - `.ai-agents/templates/help/HelpNeeded.md`

## EXAMPLES

### Good: Clear Progress Update
```
Summary:
  - Local progress: Fixed calendar sync timeout, added retry logic, ran tests
  - Files modified: src/calendar-api.ts, test-calendar-sync.ts
  - Tests run: npm test test-calendar-sync.ts ✅ PASSED
  - Remote status: Branch feature/84-fix-sync pushed, Draft PR created
  - Next steps: Wait for code review
  - Blocking issues: None
```

### Bad: Vague Progress Update
```
Summary:
  - Local progress: Made some changes
  - Remote status: Something happened
  - Next steps: Not sure
```

### Good: Specific Status Update
```
Issue #84: "Fix calendar sync timeout"
- ✅ Identified root cause: Missing retry logic in calendar API
- ✅ Implemented exponential backoff with jitter
- ✅ Added comprehensive test coverage (5 new test cases)
- ✅ All tests passing locally
- ✅ Pushed to feature/84-fix-sync
- ✅ Draft PR created and ready for review
- Next: Waiting for code review feedback
```

### Bad: Generic Status Update
```
Issue #84: "Fix calendar sync timeout"
- Working on it
- Made some changes
- Need to test more
```

## ACCOUNTABILITY AND RESPONSIBILITY RULES

### ABSOLUTE ACCOUNTABILITY PRINCIPLE
**The agent is 100% responsible for fixing their own work and mistakes. No exceptions.**

### PROHIBITED ACCOUNTABILITY DEFLECTION
**NEVER suggest the user should handle the agent's responsibilities:**

❌ **PROHIBITED LANGUAGE:**
- "Would you like me to work with you to fix this, or would you prefer to handle it yourself?"
- "Should I do X or would you prefer to do Y?"
- "Do you want to fix this yourself?"
- "Can you handle this part for me?"
- "Would you like to take over this task?"

✅ **REQUIRED LANGUAGE:**
- "I will fix this myself"
- "I am working to resolve this issue"
- "I will complete the proper validation"
- "I take full responsibility for this mistake"

### HELP vs RESPONSIBILITY DISTINCTION

**APPROPRIATE Help Requests (when genuinely blocked):**
- "I'm blocked on X technical issue, can you provide guidance?"
- "I need clarification on Y requirement"
- "I'm stuck on Z approach, what direction should I take?"

**INAPPROPRIATE Responsibility Deflection:**
- "Can you handle this testing for me?"
- "Would you prefer to do this validation yourself?"
- "Should I continue or do you want to take over?"

### OWNERSHIP PROTOCOL
- **Agent breaks it** → **Agent fixes it**
- **Agent makes mistake** → **Agent corrects it**  
- **Agent claims false success** → **Agent provides real validation**
- **Agent creates problems** → **Agent solves them**

**No exceptions. No deflection. No user responsibility for agent mistakes.**