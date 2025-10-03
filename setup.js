#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logHeader(message) {
    log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}`);
    log('─'.repeat(message.length));
}

function logStep(message) {
    log(`\n${colors.bright}${colors.magenta}${message}${colors.reset}`);
}

function ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        logSuccess(`Created directory: ${dirPath}`);
    }
}

function writeFile(filePath, content) {
    ensureDirectory(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    logSuccess(`Created file: ${filePath}`);
}

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            logSuccess(`Copied: ${destPath}`);
        }
    }
}

function askQuestion(question, defaultValue = 'y') {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const defaultText = defaultValue ? ` (${defaultValue})` : '';
        rl.question(`${question}${defaultText}: `, (answer) => {
            rl.close();
            const finalAnswer = answer.trim() || defaultValue;
            resolve(finalAnswer.toLowerCase());
        });
    });
}

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
    
    logSuccess('Created directory structure');

    // Create BUGFIX template
    const bugfixTemplate = `Issue: #<issue>"

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

    // Copy rule files from the templates directory if it exists
    if (fs.existsSync('templates/rules')) {
        copyDirectory('templates/rules', 'rules');
        logSuccess('Copied rule templates');
    } else {
        logInfo('No rule templates found, skipping');
    }

    // Copy workflow templates if they exist
    if (fs.existsSync('templates/workflows')) {
        copyDirectory('templates/workflows', 'workflows');
        logSuccess('Copied workflow templates');
    } else {
        logInfo('No workflow templates found, skipping');
    }

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

async function runSetup() {
    logHeader('FRAIM Setup');
    logInfo('Setting up FRAIM in the current directory...');

    // Create project structure
    logStep('Creating project structure');
    createProjectStructure();

    logSuccess('\nFRAIM setup completed successfully!');
    logInfo('\nNext steps:');
    log('1. Review the created files and directories');
    log('2. Customize the templates to fit your project');
    log('3. Set up GitHub Actions workflows');
    log('4. Start using FRAIM to manage your AI agents!');
}

async function runWizard() {
    logHeader('FRAIM Interactive Setup Wizard');
    logInfo('This wizard will guide you through setting up FRAIM in your project.');

    const setupProject = await askQuestion('Do you want to set up FRAIM in the current directory?');
    if (setupProject !== 'y' && setupProject !== 'yes') {
        logInfo('Setup cancelled.');
        return;
    }

    // Create project structure
    logStep('Creating project structure');
    createProjectStructure();

    // Ask about GitHub Actions
    const setupGitHubActions = await askQuestion('Do you want to set up GitHub Actions workflows?');
    if (setupGitHubActions === 'y' || setupGitHubActions === 'yes') {
        logStep('Setting up GitHub Actions workflows');
        // TODO: Implement GitHub Actions setup
        logInfo('GitHub Actions setup is not yet implemented.');
    }

    logSuccess('\nFRAIM setup completed successfully!');
    logInfo('\nNext steps:');
    log('1. Review the created files and directories');
    log('2. Customize the templates to fit your project');
    log('3. Set up GitHub Actions workflows');
    log('4. Start using FRAIM to manage your AI agents!');
}

// If this file is run directly, execute the setup
if (require.main === module) {
    runSetup();
}

// Export functions for use in other files
module.exports = {
    runSetup,
    runWizard
};