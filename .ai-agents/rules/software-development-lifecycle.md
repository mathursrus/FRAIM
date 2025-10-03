# Software Development Lifecycle

## INTENT
To provide a structured, phase-based approach to issue resolution that ensures proper planning, implementation, testing, and cleanup while maintaining coordination with other agents and respecting project governance.

## PRINCIPLES
- **Phase-Based Development**: Clear phases with specific deliverables
- **Branch Safety**: Never work on master, always use feature branches
- **Local Development**: Work in isolated clones to prevent conflicts
- **Coordination**: Use GitHub for agent coordination and status management
- **Governance**: Respect CODEOWNERS and project policies

## CORE WORKFLOW
Always work on the feature branch for the current issue: `feature/<issue#>-<kebab-title>`. Never push to master.

### Development Workflow
1. **Clone Setup**: Work in your own cloned repository folder. Folder name should be `Ashley Calendar AI - Issue {issue_number}`
2. **Branch Management**: Create/checkout feature branch for your issue
3. **Local Development**: Make changes, run tests locally
4. **Check before commit**: Only commit after approval from the user.
5. **Remote Coordination**: Use GitHub MCP for issue labels

## MANDATORY PRE-COMMIT VALIDATION
Before ANY commit, run: `git branch` and verify NOT on master

## PHASES

### Design Phase
- **Trigger**: Set ISSUE to `phase:design`
- **Deliverable**: Create RFC document
- **Status**: Automatically set to `status:wip`

### Implementation Phase
- **Trigger**: Set ISSUE to `phase:impl`
- **Deliverable**: Working code with tests
- **Status**: Set to `status:needs-review` when ready

## STATUS MANAGEMENT
- **WIP**: Automatically set when entering new phase
- **Needs Review**: Set this when work is ready for review
- **Complete**: Automatically set when PR is approved

## PR REQUIREMENTS
- Implementation PR body MUST include `Closes #<n>`
- Let Actions handle PR creation and updates
- Address all reviewer feedback before completion

## EXAMPLES

### Good: Proper Phase Management
```
Issue #84: "Fix calendar sync timeout"
1. Set phase:design → Create RFC for retry logic
2. Set phase:impl → Implement exponential backoff
3. Set status:needs-review → Ready for code review
4. PR approved → Set status:complete
Result: Clear progression through phases
```

### Bad: Skipping Phases
```
Issue #84: "Fix calendar sync timeout"
1. Jump straight to coding without design
2. No RFC created
3. Implementation lacks proper planning
Result: Incomplete solution, potential rework
```

## PRE-PHASE VALIDATION

### Before Starting Any Phase
Agents MUST complete validation checklist:

1. **Read Relevant Rules**:
   - [ ] Read `.ai-agents/rules/software-development-lifecycle.md`
   - [ ] Read phase-specific workflow (design.md, implement.md, etc.)
   - [ ] Read retrospectives folder thoroughly and understand past learnings

2. **Verify Environment**:
   - [ ] Confirm working directory is correct
   - [ ] Verify branch exists and is checked out
   - [ ] Check issue labels are correct

3. **Template Validation**:
   - [ ] Locate correct template file
   - [ ] Verify template exists and is readable
   - [ ] Confirm naming convention understanding

4. **Technical Understanding**:
   - [ ] Understand relevant technical patterns for the issue
   - [ ] Plan test strategy for core functionality

### Validation Failure Response
If any validation step fails:
1. Stop work immediately
2. Read missing documentation
3. Ask clarifying questions if needed
4. Resume only after validation complete

## CLEANUP
When user confirms code is correctly merged into master, confirm with the user, then 
- delete remote branch
- delete local branch
- remove your local clone folder:
```
cd ..
Remove-Item -Recurse -Force "Ashley Calendar AI - Issue {issue_number}"
```

Respect CODEOWNERS; don't modify auth/CI without approval.