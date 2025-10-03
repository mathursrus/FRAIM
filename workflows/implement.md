# Implementation Phase Workflow

## Overview
The implementation phase focuses on translating the approved design into working code that meets all requirements and quality standards.

## Prerequisites
- Approved RFC or design document
- Issue with `status:ready-for-implementation` label
- Feature branch created from master

## Steps

### 1. Environment Setup
- Ensure development environment is properly configured
- Verify access to all required resources
- Set up any necessary dependencies
- Create a feature branch if not already done

### 2. Incremental Implementation
- Break down implementation into small, manageable chunks
- Implement one component at a time
- Follow the architecture defined in the design phase
- Commit frequently with descriptive commit messages

### 3. Testing
- Write unit tests for each component
- Ensure tests cover edge cases and error scenarios
- Implement integration tests for component interactions
- Verify that all tests pass locally

### 4. Code Quality
- Follow coding standards and best practices
- Ensure code is readable and maintainable
- Add appropriate documentation
- Address any linting or static analysis issues

### 5. Refactoring
- Refactor code to improve quality and maintainability
- Eliminate code duplication
- Optimize performance where necessary
- Ensure all tests still pass after refactoring

### 6. Review Preparation
- Verify all requirements are implemented
- Ensure all tests are passing
- Update documentation if needed
- Prepare a summary of changes for the PR description

### 7. Pull Request
- Create a pull request from the feature branch to master
- Include a detailed description of changes
- Reference the original issue
- Request reviews from appropriate team members

## Deliverables
- Working code that implements the design
- Comprehensive test suite
- Updated documentation
- Pull request ready for review

## Transition to Testing
- Add `status:ready-for-testing` label to the issue
- Remove `status:in-implementation` label

## Best Practices
- Follow the RIGOR methodology
- Commit frequently with descriptive messages
- Write tests before or alongside implementation
- Keep the PR focused on the specific issue
- Address code review feedback promptly
- Ensure all CI checks pass before requesting review