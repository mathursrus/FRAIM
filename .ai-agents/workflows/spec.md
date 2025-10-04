# Specification Phase

## INTENT
To create comprehensive, detailed product specifications that clarify the Why, What and User Experiences for new features

## PRINCIPLES
- **Start with the User**: Understand the user's needs and experiences before implementing
- **User Experience Matters**: Focus on creating a great user experience right from the beginning
- **Validation Criteria**: Define clear validation criteria to ensure the feature meets user needs

## SPECIFICATION WORKFLOW

### Step 1: Issue Identification
Ask for {issue_number} (and optional {slug}). Get slug details using GitHub MCP.

### Step 2: Phase Initiation
Label the issue 'phase:spec' (GitHub Action will automatically label the issue `status:wip` and update the existing draft PR)

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
Before creating any specification document, agents MUST:

1. **Verify Template Selection**:
   - Use `.ai-agents/templates/specs/FEATURESPEC-TEMPLATE.md`
   
2. **Validate Naming Convention**:
   - Format: `docs/feature specs/{issue_number}-{kebab-title}.md`
   - Example: `docs/feature specs/228-improve-token-refresh.md`
   - NO other naming patterns allowed

3. **Template Compliance Check**:
   - Read and understand the template first
   
### Step 6: Specification Document Creation
Your work entails the following:
- Create docs/feature specs/{issue_number}-{slug}.md.  
- Understand the issue, the existing product functionality. Use playwright for manually looking through the UI if needed.
- Research and document the why, what and user experiences for the feature.
- Create UI mockups for the feature under `docs/feature specs/mocks/` directory. Make them good looking and user friendly.
- Create a validation plan for the feature. You will be validating what the engineers build.

### Step 7: Specification Creation Checklist
Before commiting your work, verify:
- [ ] Correct template used
- [ ] Proper file naming: `{issue_number}-{kebab-title}.md`
- [ ] All template sections completed
- [ ] No placeholder text remaining
- [ ] Issue labeled `phase:spec`
- [ ] Working in correct branch
- [ ] File saved in `docs/feature specs/` directory
- [ ] UI mocks, if needed, created in `docs/feature specs/mocks/` directory
- [ ] Validation plan created

### Step 8: Submit for Review
- Commit and sync your work
- Label the issue 'status:needs-review' and remove 'status:wip'
- Update the PR with a comment to include evidence - Use template `.ai-agents/templates/evidence/Spec-Evidence.md`
- Follow `.ai-agents/rules/pr-workflow-completeness.md`

### Step 9: Iteration
If workflow actions or reviewer feedback indicates more work is needed:
- Label the issue 'status:wip' and remove 'status:needs-review'
- Go back to Step 6 and iterate until PR is approved

## EXAMPLES

### Good: Comprehensive Specification Process
```
Issue #228: "Improve token refresh mechanism"
1. ✅ Identified: Issue #228, slug: "improve-token-refresh"
2. ✅ Phase: Set phase:spec, PR created
3. ✅ Environment: User ran prep-issue.sh, ready to work
4. ✅ Location: Working in prepared workspace with Serena indexing
5. ✅ Specification: Created docs/feature specs/228-improve-token-refresh.md
6. ✅ Template: Used FEATURESPEC-TEMPLATE.md
7. ✅ Review: Set status:needs-review, provided evidence
8. ✅ Iteration: Incorporated feedback, updated specification
Result: Clear, actionable specification document
```

### Bad: Incomplete Specification Process
```
Issue #228: "Improve token refresh mechanism"
1. ✅ Identified: Issue #228
2. ❌ Skip: Didn't set phase:spec
3. ❌ Skip: Didn't create branch
4. ❌ Skip: Started without proper template
5. ❌ Skip: No UI mockups created
6. ❌ Skip: No validation plan
Result: Incomplete, unclear specification
```
