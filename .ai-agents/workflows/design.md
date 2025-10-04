# Design Phase

## INTENT
To create comprehensive, detailed technical design documents that plan solutions before implementation, ensuring proper architecture, clear requirements, and stakeholder alignment through structured RFCs and bug fix templates.

## PRINCIPLES
- **Design First**: Plan before implementing to avoid rework
- **Template Consistency**: Use established templates for different types of changes
- **Stakeholder Alignment**: Get review and approval before implementation
- **Clear Documentation**: Create detailed, actionable design documents
- **Iterative Refinement**: Incorporate feedback and iterate on designs
- **Spike-First Development**: Follow `.ai-agents/rules/spike-first-development.md` to validate technology compatibility before building complex solutions

## DESIGN WORKFLOW

### Step 1: Issue Identification
Ask for {issue_number} (and optional {slug})
### Step 2: Phase Initiation
Label the issue 'phase:design' (GitHub Action will automatically label the issue `status:wip` and update the existing draft PR)

### Step 3: Environment Setup
**IMPORTANT**: The user has already run `prep-issue.sh` which has:
- ✅ Created the feature branch
- ✅ Checked out the branch
- ✅ Created draft PR
- ✅ Indexed the codebase with Serena
- ✅ Opened the editor in the prepared workspace

You can start working immediately in the prepared environment. No need to create branches or wait for GitHub Actions.

### Step 4: Work Location
You are already in the correct workspace prepared by the user. Confirm you're on the right branch and start working.

### Step 5: Pre-Creation Validation
Before creating any design document, agents MUST:

1. **Spike-First Development Check**:
   - Read and follow `.ai-agents/rules/spike-first-development.md`
   - If design involves unfamiliar technology, plan spike/proof-of-concept first
   - Validate technology compatibility before designing complex solutions
   - Avoid "Build First, Integrate Later" anti-pattern

2. **Verify Template Selection**:
   - For bug fixes: Use `.ai-agents/templates/specs/BUGSPEC-TEMPLATE.md`
   - For new features: Use `.ai-agents/templates/specs/TECHSPEC-TEMPLATE.md`
   - Confirm template exists before proceeding
   - If you cannot find the template, stop and ask for help as per `.ai-agents/rules/communication.md`

3. **Validate Naming Convention**:
   - Format: `docs/rfcs/{issue_number}-{kebab-title}.md`
   - Example: `docs/rfcs/228-improve-token-refresh.md`
   - NO other naming patterns allowed

4. **Template Compliance Check**:
   - Read the selected template first
   - Ensure all required sections are included
   - Verify placeholder format matches template

5. **Workflow Rule Verification**:
   - Confirm issue is labeled `phase:design`
   - Verify branch exists before starting work
   - Check working directory is correct

### Step 6: Design Document Creation
Your work entails the following:
- Create docs/rfcs/{issue_number}-{slug}.md.  
- Use the correct template as per #1
- Check if there is an existing spec for  this issue. Specs are stored in `docs/feature specs/` and share the same naming convention as the RFCs. If there is an existing spec, read through it and understand if fully.
- Understand the issue, the existing codebase, and be detailed in your technical design. The better your initial design, manual valiation, testing plan, the smoother the implementation will go.


### Step 7: Design Creation Checklist
Before commiting your work, verify:
- [ ] Correct template used (BUGFIX-TEMPLATE.md or RFC-TEMPLATE.md)
- [ ] Proper file naming: `{issue_number}-{kebab-title}.md`
- [ ] All template sections completed
- [ ] No placeholder text remaining
- [ ] Issue labeled `phase:design`
- [ ] Working in correct branch
- [ ] File saved in `docs/rfcs/` directory
- [ ] If issue is a bug, you have reproduced it
- [ ] You understand the codebase and have high confidence in your design

### Step 8: Submit for Review
- Commit and sync your work
- Label the issue 'status:needs-review' and remove 'status:wip'
- Update the PR with a comment to include evidence - Use template `.ai-agents/templates/evidence/Design-Evidence.md`
- Follow `.ai-agents/rules/pr-workflow-completeness.md`

### Step 9: Iteration
If workflow actions or reviewer feedback indicates more work is needed:
- Label the issue 'status:wip' and remove 'status:needs-review'
- Go back to Step 6 and iterate until PR is approved

## EXAMPLES

### Good: Comprehensive Design Process
```
Issue #84: "Fix API integration timeout"
1. ✅ Identified: Issue #84, slug: "fix-sync-timeout"
2. ✅ Phase: Set phase:design, PR created
3. ✅ Environment: User ran prep-issue.sh, ready to work
4. ✅ Location: Working in prepared workspace with Serena indexing
5. ✅ Design: Created docs/rfcs/84-fix-sync-timeout.md
6. ✅ Template: Used BUG-TEMPLATE.md for bug fix
7. ✅ Review: Set status:needs-review
8. ✅ Iteration: Incorporated feedback, updated design
Result: Clear, actionable design document
```

### Bad: Incomplete Design Process
```
Issue #84: "Fix API integration timeout"
1. ✅ Identified: Issue #84
2. ❌ Skip: Didn't set phase:design
3. ❌ Skip: Didn't create branch
4. ❌ Skip: Started coding without design
5. ❌ Skip: No RFC document created
6. ❌ Skip: No stakeholder review
Result: Unclear requirements, potential rework
```