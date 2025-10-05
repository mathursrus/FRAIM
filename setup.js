#!/usr/bin/env node

/**
 * FRAIM Framework Setup Script
 * 
 * This script sets up the FRAIM framework in a repository.
 * It creates the necessary directory structure, configuration files,
 * and templates for AI agent management.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
};

// Logging functions
function log(message) {
    console.log(message);
}

function logHeader(message) {
    console.log('\n' + colors.bright + colors.cyan + '='.repeat(60) + colors.reset);
    console.log(colors.bright + colors.cyan + ' ' + message + colors.reset);
    console.log(colors.bright + colors.cyan + '='.repeat(60) + colors.reset + '\n');
}

function logStep(message) {
    console.log('\n' + colors.bright + colors.blue + '➤ ' + message + colors.reset);
}

function logSuccess(message) {
    console.log(colors.green + '✓ ' + message + colors.reset);
}

function logInfo(message) {
    console.log(colors.cyan + 'ℹ ' + message + colors.reset);
}

function logWarning(message) {
    console.log(colors.yellow + '⚠ ' + message + colors.reset);
}

function logError(message) {
    console.error(colors.red + '✗ ' + message + colors.reset);
}

// Helper functions
function ensureDirectory(dir) {
    const fullPath = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        return true;
    }
    return false;
}

function writeFile(filePath, content) {
    const fullPath = path.resolve(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
}

function copyFile(src, dest) {
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), dest);
    
    if (fs.existsSync(srcPath)) {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        fs.copyFileSync(srcPath, destPath);
        return true;
    }
    
    return false;
}

function copyDirectory(src, dest) {
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), dest);
    
    if (!fs.existsSync(srcPath)) {
        return false;
    }
    
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }
    
    const files = fs.readdirSync(srcPath);
    
    for (const file of files) {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);
        
        if (fs.statSync(srcFile).isDirectory()) {
            copyDirectory(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    }
    
    return true;
}

function isGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Interactive prompt
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

async function askQuestion(question) {
    const rl = createReadlineInterface();
    
    return new Promise(resolve => {
        rl.question(colors.yellow + '? ' + question + ' (y/n) ' + colors.reset, answer => {
            rl.close();
            resolve(answer.toLowerCase());
        });
    });
}

async function askInput(question, defaultValue = '') {
    const rl = createReadlineInterface();
    
    return new Promise(resolve => {
        rl.question(colors.yellow + '? ' + question + (defaultValue ? ` (${defaultValue})` : '') + ': ' + colors.reset, answer => {
            rl.close();
            resolve(answer || defaultValue);
        });
    });
}

// Create rule files
function createRuleFiles() {
    // Create integrity-and-test-ethics.md
    const integrityContent = `# Integrity and Test Ethics

THIS IS THE MOST CRITICAL RULE. Be ethical, truthful, honest above all.

## Core Principles

1. **Honesty in Testing**: Never fake test results or evidence. If a test fails, report it accurately.
2. **Transparency**: Always disclose limitations, edge cases, and potential issues.
3. **Ethical Code Generation**: Generate code that respects privacy, security, and user consent.
4. **Accurate Representation**: Never claim functionality that doesn't exist or isn't implemented.
5. **Intellectual Property Respect**: Properly attribute sources and respect licensing terms.

## Test Ethics Guidelines

- **No Fabrication**: Never fabricate test results or evidence
- **Complete Reporting**: Report all test failures, not just successes
- **Reproducible Tests**: Ensure tests are reproducible and deterministic
- **Edge Case Honesty**: Explicitly document edge cases that aren't handled
- **Performance Transparency**: Be honest about performance limitations

## Implementation Ethics

- **Security First**: Never suggest insecure implementations for convenience
- **Privacy Respect**: Handle user data with appropriate protections
- **Accessibility**: Consider accessibility implications in all designs
- **Documentation**: Document known limitations and issues
- **Attribution**: Properly attribute external code sources and inspirations`;
    writeFile('.ai-agents/rules/integrity-and-test-ethics.md', integrityContent);
    logSuccess('Created integrity-and-test-ethics.md');

    // Create simplicity.md
    const simplicityContent = `# Simplicity

Keep solutions simple and focused, avoid over-engineering.

## Core Principles

1. **Focus on the Current Issue**: When fixing an issue, focus only on that issue.
2. **Avoid Premature Optimization**: Don't optimize code until there's a demonstrated need.
3. **Minimize Dependencies**: Add new dependencies only when absolutely necessary.
4. **Readable Over Clever**: Prefer readable code over clever solutions.
5. **Incremental Changes**: Make small, focused changes rather than large rewrites.

## Guidelines

- **Single Responsibility**: Each function, class, or module should have a single responsibility
- **Explicit Over Implicit**: Favor explicit code over implicit behavior
- **Standard Patterns**: Use standard patterns and idioms when possible
- **Minimal API Surface**: Keep public APIs minimal and focused
- **Avoid Premature Abstraction**: Don't abstract until you see repeated patterns

## When Fixing Issues

- Focus only on the specific issue at hand
- Avoid making unrelated changes
- File separate issues for other problems you discover
- Keep the scope narrow and well-defined`;
    writeFile('.ai-agents/rules/simplicity.md', simplicityContent);
    logSuccess('Created simplicity.md');

    // Create architecture.md
    const architectureContent = `# Architecture

Maintain clean architectural boundaries by using appropriate technologies for each task.

## Core Principles

1. **Separation of Concerns**: Keep different parts of the system focused on their specific responsibilities.
2. **Clean Interfaces**: Define clear interfaces between components.
3. **Appropriate Technologies**: Use the right tool for each job.
4. **Testability**: Design components to be easily testable.
5. **Scalability**: Consider how the architecture will scale with increased load or complexity.

## Guidelines

- **Domain-Driven Design**: Model the system around the business domain
- **Layered Architecture**: Maintain clear separation between layers
- **Dependency Injection**: Use dependency injection for flexible component composition
- **Interface-First Design**: Define interfaces before implementations
- **Consistent Patterns**: Apply consistent patterns throughout the codebase

## Technology Selection

- Use natural language processing technologies for language understanding tasks
- Use deterministic code for business logic and data processing
- Select appropriate data storage technologies based on access patterns
- Choose UI frameworks based on application requirements and team expertise`;
    writeFile('.ai-agents/rules/architecture.md', architectureContent);
    logSuccess('Created architecture.md');

    // Create continuous-learning.md
    const continuousLearningContent = `# Continuous Learning

Prevent repeating past mistakes by systematically learning from retrospectives, RFCs, and historical issue patterns.

## Core Principles

1. **Learn from History**: Review past issues and solutions before starting similar work.
2. **Document Learnings**: Capture insights in retrospectives and knowledge bases.
3. **Share Knowledge**: Ensure learnings are accessible to all team members.
4. **Evolve Practices**: Continuously refine processes based on experience.
5. **Anticipate Issues**: Use historical patterns to predict and prevent problems.

## Guidelines

- **Review Retrospectives**: Always review relevant retrospectives before starting work
- **RFC Analysis**: Study RFCs for design decisions and rationales
- **Pattern Recognition**: Identify recurring issues and their root causes
- **Knowledge Base**: Contribute to and utilize the team's knowledge base
- **Feedback Loops**: Create tight feedback loops for rapid learning

## Implementation

- Before starting work on an issue, search for similar past issues
- Review retrospectives from related features or components
- Check knowledge base for relevant patterns and anti-patterns
- Document new learnings after completing work
- Share insights with the team through appropriate channels`;
    writeFile('.ai-agents/rules/continuous-learning.md', continuousLearningContent);
    logSuccess('Created continuous-learning.md');

    // Create successful-debugging-patterns.md
    const debuggingContent = `# Successful Debugging Patterns

Debug issues systematically and convert learnings into test cases.

## Core Principles

1. **Systematic Approach**: Follow a structured debugging methodology.
2. **Evidence-Based**: Base conclusions on evidence, not assumptions.
3. **Root Cause Analysis**: Identify the root cause, not just symptoms.
4. **Test Case Creation**: Create tests that verify the fix and prevent regression.
5. **Knowledge Sharing**: Document findings for future reference.

## Debugging Methodology

1. **Reproduce**: Create a reliable reproduction of the issue
2. **Isolate**: Narrow down the scope to the smallest possible area
3. **Hypothesize**: Form testable hypotheses about the cause
4. **Test**: Verify or disprove each hypothesis systematically
5. **Fix**: Address the root cause, not just symptoms
6. **Verify**: Confirm the fix resolves the issue
7. **Prevent**: Add tests to prevent regression

## Best Practices

- Use logging strategically to gather information
- Leverage debugging tools appropriate for the technology
- Break complex issues into smaller, testable components
- Document the debugging process and findings
- Create regression tests that would have caught the issue`;
    writeFile('.ai-agents/rules/successful-debugging-patterns.md', debuggingContent);
    logSuccess('Created successful-debugging-patterns.md');
}

// Create workflow templates
function createWorkflowTemplates() {
    // Create design.md
    const designContent = `# Design Phase Workflow

## Overview
This workflow guides the design phase for new features or significant changes.

## Steps

### 1. Understand Requirements
- Review the issue description thoroughly
- Clarify any ambiguities with stakeholders
- Identify acceptance criteria and constraints

### 2. Research
- Review similar features in the codebase
- Check retrospectives for related work
- Research industry best practices
- Identify potential technical approaches

### 3. Create RFC Document
- Create a new RFC document in docs/rfcs/
- Follow the RFC template structure
- Include:
  - Problem statement
  - Proposed solution
  - Alternative approaches considered
  - Implementation plan
  - Testing strategy
  - Rollout plan

### 4. Design Review
- Submit RFC for review
- Address feedback and iterate
- Get final approval from stakeholders

### 5. Transition to Implementation
- Update issue with design decisions
- Add implementation tasks
- Apply "status:ready-for-implementation" label

## Deliverables
- Comprehensive RFC document
- Updated issue with implementation tasks
- Design approval from stakeholders`;
    writeFile('.ai-agents/workflows/design.md', designContent);
    logSuccess('Created design.md workflow');

    // Create implement.md
    const implementContent = `# Implementation Phase Workflow

## Overview
This workflow guides the implementation phase after design approval.

## Steps

### 1. Prepare Development Environment
- Create a feature branch from master
- Set up local development environment
- Verify test environment is working

### 2. Implementation Planning
- Break down work into manageable tasks
- Prioritize tasks in logical order
- Create a test plan for the implementation

### 3. Iterative Development
- Implement features in small, testable increments
- Write tests alongside code
- Commit frequently with descriptive messages
- Keep changes focused on the current issue

### 4. Testing
- Run existing tests to ensure no regressions
- Add new tests for added functionality
- Test edge cases and error conditions
- Document test evidence

### 5. Code Review Preparation
- Self-review code for quality and standards
- Ensure all tests are passing
- Update documentation as needed
- Prepare PR description with implementation details

### 6. Submit Pull Request
- Create PR with comprehensive description
- Link to the original issue
- Include test evidence
- Request review from appropriate reviewers

## Deliverables
- Working implementation of the feature
- Comprehensive test coverage
- Updated documentation
- Pull request ready for review`;
    writeFile('.ai-agents/workflows/implement.md', implementContent);
    logSuccess('Created implement.md workflow');

    // Create test.md
    const testContent = `# Testing Phase Workflow

## Overview
This workflow guides the testing phase to ensure quality and reliability.

## Steps

### 1. Test Planning
- Review requirements and acceptance criteria
- Identify test scenarios and edge cases
- Create a test plan document
- Define test data requirements

### 2. Test Implementation
- Implement unit tests for individual components
- Create integration tests for component interactions
- Develop end-to-end tests for user flows
- Write performance tests if applicable

### 3. Test Execution
- Run all tests in development environment
- Document test results and evidence
- Investigate and fix any test failures
- Verify fixes with additional test runs

### 4. Edge Case and Error Testing
- Test boundary conditions
- Verify error handling and recovery
- Test with invalid or unexpected inputs
- Verify security constraints

### 5. Documentation
- Document test coverage
- Record test evidence (screenshots, logs)
- Update test documentation
- Document any known limitations

### 6. Test Review
- Review test results with stakeholders
- Address any feedback or concerns
- Get approval for test completion
- Apply "status:approved" label when tests pass

## Deliverables
- Comprehensive test suite
- Test evidence documentation
- Test coverage report
- Stakeholder approval of test results`;
    writeFile('.ai-agents/workflows/test.md', testContent);
    logSuccess('Created test.md workflow');

    // Create resolve.md
    const resolveContent = `# Issue Resolution Workflow

## Overview
This workflow guides the process of resolving issues and bugs.

## Steps

### 1. Issue Triage
- Verify the issue can be reproduced
- Assess severity and priority
- Identify affected components
- Determine if it's a regression

### 2. Investigation
- Reproduce the issue consistently
- Identify the root cause through debugging
- Document findings and affected code paths
- Create a minimal reproduction if possible

### 3. Solution Design
- Design a fix that addresses the root cause
- Consider potential side effects
- Ensure backward compatibility if needed
- Document the proposed solution

### 4. Implementation
- Create a fix branch from master
- Implement the solution
- Add tests that would have caught the issue
- Verify the fix resolves the issue

### 5. Testing
- Run existing tests to ensure no regressions
- Test the specific fix thoroughly
- Document test evidence
- Verify edge cases are handled

### 6. Code Review and Merge
- Submit PR with detailed description
- Include reproduction steps and fix explanation
- Request review from appropriate reviewers
- Address feedback and iterate as needed

### 7. Verification
- Verify fix in production or staging
- Document verification evidence
- Close the issue with reference to the fix

## Deliverables
- Root cause analysis
- Fixed implementation
- Tests that prevent regression
- Documentation of the resolution`;
    writeFile('.ai-agents/workflows/resolve.md', resolveContent);
    logSuccess('Created resolve.md workflow');

    // Create retrospect.md
    const retrospectContent = `# Retrospective Workflow

## Overview
This workflow guides the process of conducting retrospectives after completing significant work.

## Steps

### 1. Preparation
- Schedule retrospective meeting
- Gather metrics and data about the work
- Review issue history and PRs
- Identify key events and milestones

### 2. Retrospective Meeting
- Review what went well
- Identify what could be improved
- Discuss unexpected challenges
- Recognize team and individual contributions

### 3. Root Cause Analysis
- Analyze issues and challenges
- Identify root causes, not just symptoms
- Look for patterns across multiple issues
- Consider process and technical factors

### 4. Action Items
- Create specific, actionable improvements
- Assign owners to action items
- Set deadlines for implementation
- Create issues for tracking action items

### 5. Documentation
- Document retrospective findings
- Create retrospective document in /retrospectives/
- Include metrics, learnings, and action items
- Share with the team and stakeholders

### 6. Follow-up
- Track progress on action items
- Implement process improvements
- Update documentation and guidelines
- Reference learnings in future work

## Deliverables
- Retrospective document with findings
- Action items with owners and deadlines
- Updated processes and guidelines
- Knowledge sharing with the team`;
    writeFile('.ai-agents/workflows/retrospect.md', retrospectContent);
    logSuccess('Created retrospect.md workflow');
}

// Create project structure
function createProjectStructure() {
    // Create directories
    ensureDirectory('.ai-agents/rules');
    ensureDirectory('.ai-agents/workflows');
    ensureDirectory('.ai-agents/templates/evidence');
    ensureDirectory('.ai-agents/templates/retrospective');
    ensureDirectory('.ai-agents/templates/specs');
    ensureDirectory('.ai-agents/templates/help');
    ensureDirectory('.ai-agents/scripts');
    ensureDirectory('examples/simple-webapp');
    ensureDirectory('.github/workflows');
    ensureDirectory('docs');
    
    logSuccess('Created directory structure');

    // Create BUGFIX template
    const bugfixTemplate = `Issue: #<issue>

## Tests
- Could be existing tests that are failing and need to be fixed
- Could be new tests that need to be added into an existing test suite
- Could be a new test suite
`;
    writeFile('.ai-agents/templates/specs/BUGSPEC-TEMPLATE.md', bugfixTemplate);
    logSuccess('Created BUGSPEC-TEMPLATE.md');

    // Create RFC template
    const rfcTemplate = `# RFC: <Title>

Issue: #<issue>  
Owner: <agent>

## Design Details
- User Experience changes (incl. all modalities currently supported: see codebase to know which ones)
- API surface (OpenAPI) changes
- Data model / schema changes
- Failure modes & timeouts
- Telemetry & analytics

## Test Matrix
- Unit: modules & edge cases
- Integration: API <-> DB <-> external
- E2E: user flows (happy/sad)`;
    writeFile('.ai-agents/templates/specs/FEATURESPEC-TEMPLATE.md', rfcTemplate);
    logSuccess('Created FEATURESPEC-TEMPLATE.md');

    // Copy all rule files from the package
    copyRuleFiles();
    logSuccess('Created rule files');

    // Create workflow templates
    createWorkflowTemplates();
    logSuccess('Created workflow templates');
    
    // Copy additional files
    copyAdditionalFiles();
    logSuccess('Copied additional files');

    // Create basic CODEOWNERS file
    const codeownersContent = `# This file defines the code owners for the repository
# Code owners are automatically requested for review when someone opens a PR that modifies code they own
# See: https://docs.github.com/en/repositories/managing-your-codebase-in-github/about-code-owners

# Default owners for everything in the repo
*       @${process.env.USER || 'repo-owner'}

# Specific ownership for different parts of the codebase
/rules/          @${process.env.USER || 'repo-owner'}
/workflows/      @${process.env.USER || 'repo-owner'}
/templates/      @${process.env.USER || 'repo-owner'}
/scripts/        @${process.env.USER || 'repo-owner'}
/.github/        @${process.env.USER || 'repo-owner'}

# Documentation
/docs/           @${process.env.USER || 'repo-owner'}
*.md             @${process.env.USER || 'repo-owner'}`;
    writeFile('CODEOWNERS', codeownersContent);
    logSuccess('Created CODEOWNERS file');

    // Create basic PR template
    const prTemplateContent = `# Pull Request

## Description
<!-- Provide a brief description of the changes in this PR -->

## Related Issue
<!-- Link to the issue this PR addresses (use format: Closes #123, Fixes #123) -->

## Type of Change
<!-- Mark the appropriate option with an [x] -->
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Tests
- [ ] Build/CI changes
- [ ] Other (please describe):

## Implementation Details
<!-- Provide a detailed description of the implementation -->

## Testing
<!-- Describe the testing you've done -->
- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Manually tested
- [ ] Test exempt (explain why)

## Evidence
<!-- Provide evidence of testing (screenshots, logs, etc.) -->

## Checklist
<!-- Mark items with [x] once completed -->
- [ ] Code follows project style guidelines
- [ ] Documentation has been updated
- [ ] All tests are passing
- [ ] PR has been reviewed by at least one team member
- [ ] Changes have been tested in a development environment

## Additional Notes
<!-- Any additional information that might be helpful for reviewers -->`;
    writeFile('.github/pull_request_template.md', prTemplateContent);
    logSuccess('Created PR template');

    // Create labels.json
    const labelsContent = `[
  {
    "name": "aiagents",
    "color": "0e8a16",
    "description": "Issue prepared for AI agent collaboration"
  },
  {
    "name": "status:ready-for-design",
    "color": "0075ca",
    "description": "Issue is ready for design phase"
  },
  {
    "name": "status:in-design",
    "color": "0075ca",
    "description": "Issue is currently in design phase"
  },
  {
    "name": "status:ready-for-implementation",
    "color": "7057ff",
    "description": "Issue is ready for implementation phase"
  },
  {
    "name": "status:in-implementation",
    "color": "7057ff",
    "description": "Issue is currently in implementation phase"
  },
  {
    "name": "status:ready-for-testing",
    "color": "008672",
    "description": "Issue is ready for testing phase"
  },
  {
    "name": "status:in-testing",
    "color": "008672",
    "description": "Issue is currently in testing phase"
  },
  {
    "name": "status:test-exempt",
    "color": "c5def5",
    "description": "Implementation is exempt from test requirements"
  },
  {
    "name": "status:blocked",
    "color": "d73a4a",
    "description": "Issue is blocked by another issue or external factor"
  },
  {
    "name": "status:needs-review",
    "color": "fbca04",
    "description": "Issue or PR needs review"
  },
  {
    "name": "status:approved",
    "color": "0e8a16",
    "description": "Issue or PR has been approved"
  },
  {
    "name": "status:needs-revision",
    "color": "d93f0b",
    "description": "Issue or PR needs revision based on feedback"
  },
  {
    "name": "priority:high",
    "color": "d93f0b",
    "description": "High priority issue"
  },
  {
    "name": "priority:medium",
    "color": "fbca04",
    "description": "Medium priority issue"
  },
  {
    "name": "priority:low",
    "color": "c5def5",
    "description": "Low priority issue"
  }
]`;
    writeFile('labels.json', labelsContent);
    logSuccess('Created labels.json');
}

// Copy rule files from the package
function copyRuleFiles() {
    const fs = require('fs');
    const path = require('path');
    
    // List of rule files to copy
    const ruleFiles = [
        'agent-testing-guidelines.md',
        'architecture.md', 
        'communication.md',
        'continuous-learning.md',
        'git-safe-commands.md',
        'integrity-and-test-ethics.md',
        'local-development.md',
        'merge-requirements.md',
        'pr-workflow-completeness.md',
        'simplicity.md',
        'software-development-lifecycle.md',
        'spike-first-development.md',
        'successful-debugging-patterns.md'
    ];
    
    // Copy each rule file
    ruleFiles.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, '.ai-agents', 'rules', file);
            const destPath = path.join('.ai-agents', 'rules', file);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                logSuccess(`Copied ${file}`);
            } else {
                console.log(`⚠️  Warning: ${file} not found in package`);
            }
        } catch (error) {
            console.log(`⚠️  Warning: Could not copy ${file}: ${error.message}`);
        }
    });
    
    // Copy workflow files
    const workflowFiles = [
        'design.md',
        'implement.md', 
        'resolve.md',
        'retrospect.md',
        'spec.md',
        'test.md'
    ];
    
    workflowFiles.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, '.ai-agents', 'workflows', file);
            const destPath = path.join('.ai-agents', 'workflows', file);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                logSuccess(`Copied ${file}`);
            } else {
                console.log(`⚠️  Warning: ${file} not found in package`);
            }
        } catch (error) {
            console.log(`⚠️  Warning: Could not copy ${file}: ${error.message}`);
        }
    });
    
    // Copy template files
    const templateFiles = [
        'templates/evidence/Design-Evidence.md',
        'templates/evidence/Implementation-BugEvidence.md', 
        'templates/evidence/Implementation-FeatureEvidence.md',
        'templates/evidence/Spec-Evidence.md',
        'templates/help/HelpNeeded.md',
        'templates/retrospective/RETROSPECTIVE-TEMPLATE.md',
        'templates/specs/BUGSPEC-TEMPLATE.md',
        'templates/specs/FEATURESPEC-TEMPLATE.md',
        'templates/specs/TECHSPEC-TEMPLATE.md'
    ];
    
    templateFiles.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, '.ai-agents', file);
            const destPath = path.join('.ai-agents', file);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                logSuccess(`Copied ${file}`);
            } else {
                console.log(`⚠️  Warning: ${file} not found in package`);
            }
        } catch (error) {
            console.log(`⚠️  Warning: Could not copy ${file}: ${error.message}`);
        }
    });
    
    // Copy script files
    const scriptFiles = [
        'scripts/cleanup-branch.ts',
        'scripts/exec-with-timeout.ts',
        'scripts/prep-issue.sh'
    ];
    
    scriptFiles.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, '.ai-agents', file);
            const destPath = path.join('.ai-agents', file);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                logSuccess(`Copied ${file}`);
            } else {
                console.log(`⚠️  Warning: ${file} not found in package`);
            }
        } catch (error) {
            console.log(`⚠️  Warning: Could not copy ${file}: ${error.message}`);
        }
    });
}

// Copy additional files
function copyAdditionalFiles() {
    const fs = require('fs');
    const path = require('path');
    
    // Copy sample files
    const additionalFiles = [
        'sample_package.json',
        'test-utils.ts',
        'tsconfig.json'
    ];
    
    additionalFiles.forEach(file => {
        try {
            const sourcePath = path.join(__dirname, file);
            const destPath = file;
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                logSuccess(`Copied ${file}`);
            } else {
                console.log(`⚠️  Warning: ${file} not found in package`);
            }
        } catch (error) {
            console.log(`⚠️  Warning: Could not copy ${file}: ${error.message}`);
        }
    });
    
    // Copy examples
    try {
        const examplesSource = path.join(__dirname, 'examples', 'simple-webapp');
        const examplesDest = 'examples/simple-webapp';
        
        if (fs.existsSync(examplesSource)) {
            ensureDirectory(examplesDest);
            
            const exampleFiles = [
                'example-test.ts',
                'TESTING.md'
            ];
            
            exampleFiles.forEach(file => {
                const sourcePath = path.join(examplesSource, file);
                const destPath = path.join(examplesDest, file);
                
                if (fs.existsSync(sourcePath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    logSuccess(`Copied examples/simple-webapp/${file}`);
                }
            });
        }
    } catch (error) {
        console.log(`⚠️  Warning: Could not copy examples: ${error.message}`);
    }
}

// Export the main setup function
function runSetup() {
    console.log('🚀 Setting up FRAIM in current repository...\n');
    
    try {
        createProjectStructure();
        console.log('\n✅ FRAIM setup complete!');
        console.log('🎯 Your repository is now ready for AI agent management.');
        console.log('📚 Next steps:');
        console.log('   1. Customize .ai-agents/rules/architecture.md for your project');
        console.log('   2. Update .ai-agents/scripts/cleanup-branch.ts with your cleanup logic');
        console.log('   3. Copy scripts from sample_package.json to your package.json');
        console.log('   4. Start creating issues with phase labels!');
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        throw error;
    }
}

// If this file is run directly, execute setup
if (require.main === module) {
    runSetup();
}

module.exports = { runSetup };