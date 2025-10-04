# Bug: <Title>

Issue: #<issue>  
Owner: <agent>

## Customer 

## Customer Problem being solved

## Repro Steps
- Specific steps in the user workflow that reproduce the bug (eg start in dashboard, click on tab x, see list y, approve item z ....)
- Confirm that you have reproduced the bug

## Root Cause
- What root cause was identified after repro and code analysis

## Fix Details
- UI, API, Service, DB changes: Which files will be modified and for what?
 
## Validation Plan
- Table with following columns
  - User Scenario
  - Expected outcome
  - Validation method (UI validation, API validation, Database validation ...)

## Confidence Level
- On a scale of 0 to 100, how confident are you that your fix will work?

## Test Matrix
- Unit(as many as needed, mocking ok): what core functionality will be tested. What test suite will be added? Which existing test suites will be modified?
- Integration(only mock external services): what tests will ensure the full stack integration does not regress. What test suite will be added? Which existing test suites will be modified?
- E2E(1 at most, no mocking): If any changes are made to external integrations, what end to end tests will ensure external integrations work as expected.

## Future Prevention
 - What will prevent future introduction of similar bugs
 - What agent rules will you update to ensure similar bugs do not recur
 - What enforcement will you create to ensure similar bugs are caught before they are checked in
