# Feature: <Title>

Issue: #<issue>  
Owner: <agent>

## Customer 

## Customer Problem being solved

## User Experience that will solve the problem
- Specific steps in the user workflow 
  - If UI feature: start on UI page a, click on tab x, see list y, approve item z, achieve outcome ....
  - If API feature: call API a with params x, y, z, receive result
  - If refactoring/rearchitecture: what is the simpler developer workflow 

## Technical Details
- UI changes: Which files will be modified and for what?
- API surface (OpenAPI) changes
- Data model / schema changes
- Failure modes & timeouts
- Telemetry & analytics

## Confidence Level
- On a scale of 0 to 100, how confident are you that your solution will work?

## Validation Plan
- Table with following columns
  - User Scenario
  - Expected outcome
  - Validation method (UI validation, API validation, Database validation ...)

## Test Matrix
- Unit(as many as needed, mocking ok): what core functionality will be tested. What test suite will be added? Which existing test suites will be modified?
- Integration(only mock external services): what tests will ensure the full stack integration does not regress. What test suite will be added? Which existing test suites will be modified?
- E2E(1 at most, no mocking): If any changes are made to external integrations, what end to end tests will ensure external integrations work as expected.

## Risks & Mitigations

## Observability (logs, metrics, alerts)
