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

// Create project structure
function createProjectStructure() {
    // Create directories
    ensureDirectory('retrospectives');
    ensureDirectory('docs/rfcs');
    ensureDirectory('rules');
    ensureDirectory('templates/evidence');
    ensureDirectory('templates/retrospective');
    ensureDirectory('templates/specs');
    ensureDirectory('templates/help');
    ensureDirectory('workflows');
    ensureDirectory('.github/workflows');
    ensureDirectory('agents/cursor');
    ensureDirectory('agents/claude');
    ensureDirectory('agents/windsurf');
    ensureDirectory('scripts');
    
    logSuccess('Created directory structure');

    // Create BUGFIX template
    const bugfixTemplate = `Issue: #<issue>

## Tests
- Could be existing tests that are failing and need to be fixed
- Could be new tests that need to be added into an existing test suite
- Could be a new test suite
`;
    writeFile('docs/rfcs/BUGFIX-TEMPLATE.md', bugfixTemplate);
    logSuccess('Created BUGFIX-TEMPLATE.md');

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
    writeFile('docs/rfcs/RFC-TEMPLATE.md', rfcTemplate);
    logSuccess('Created RFC-TEMPLATE.md');

    // Create basic rule files
    createRuleFiles();
    logSuccess('Created rule files');

    // Create workflow templates
    createWorkflowTemplates();
    logSuccess('Created workflow templates');

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