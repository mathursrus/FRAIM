# Feature: <Title>
Issue: #<issue>  
Tech Spec: <Link to tech spec>
PR: <Link to PR>

## Completeness Evidence
 - All phases of tech spec complete: Yes/No 
 - Issue tagged with label `phase:impl`: Yes/No
 - Issue tagged with label `status:needs-review`: Yes/No
 - All files committed/synced to branch: Yes/No
 - Table with following columns 
   - PR Comment
   - How Addressed

## Implementation Quality Checkpoints
 - [ ] Code complexity reviewed (no overengineering)
 - [ ] No resource waste (excessive retries, delays, workarounds)
 - [ ] Solution based on proven prototype from design phase
 - [ ] All new files/functions are actually used

## Validation Evidence
 - Complete valiation performed as suggested in tech spec: Yes/No
 - Table with following columns
    - Validation Step (manual vs automated)
    - Validation Result (pass vs fail)
    - Failure Analysis (if fail)

## New Files/Functions Created
 - Table with the following columns
    - File/Function Name
    - Purpose
    - Who is using/importing/calling it
    - Is it actually used? (Yes/No - if No, explain why it exists)

## New Tests Added
 - Added all tests suggested in tech spec: Yes/No
 - Table with the following columns
    - Test Case Name
    - What is test case validating
    - Test Result (pass vs fail)
    - Failure Analysis (if fail)

## Existing Test Suites Run
 - Table with following columns
    - Test Suite
    - Was it Run (if not, why not - it's ok to not run a suite if there is no impact of your work to it as covered in agent-testing-guidelines.md)
    - Failing Tests
    - Failure Analysis (if any tests fail)

   
## Continous Learning
 - Table with following columns
    - Learning
    - Agent Rule Updates (what agent rule file was updated to ensure the learning is durable)