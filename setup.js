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
    // Create retrospectives folder
    ensureDirectory('retrospectives');
    logSuccess('Created retrospectives folder');
    
    // Create docs/rfcs folder
    ensureDirectory('docs/rfcs');
    logSuccess('Created docs/rfcs folder');
    
    // Create BUGFIX template
    const bugfixTemplate = `Issue: #<issue>  

## Impact of the Bug

## Repro Steps

## Root Cause

## Fix

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

## Customer 

## Customer Outcome

## Customer Problem being solved

## Solution

## Alternatives

## Design Details
- User Experience changes (incl. all modalities currently supported: see codebase to know which ones)
- API surface (OpenAPI) changes
- Data model / schema changes
- Failure modes & timeouts
- Telemetry & analytics

## Test Matrix
- Unit: modules & edge cases
- Integration: API <-> DB <-> external
- E2E: user flows (happy/sad)

## Risks & Mitigations

## Observability (logs, metrics, alerts)

## Phased Delivery Plan
- Do not incude timelines
- Do include the following for each phase:
  - Deliverable
  - Value delivered by deliverable
  - What will be tested
`;
    writeFile('docs/rfcs/RFC-TEMPLATE.md', rfcTemplate);
    logSuccess('Created RFC-TEMPLATE.md');
    
    logSuccess('Project structure created');
}

async function setupGitHubCLI() {
    logStep('GitHub CLI Setup');
    logInfo('To create GitHub labels automatically, you need GitHub CLI installed and authenticated.');
    
    // Check if gh is installed
    try {
        execSync('gh --version', { stdio: 'pipe' });
        logSuccess('GitHub CLI is already installed');
    } catch (error) {
        logWarning('GitHub CLI is not installed');
        logInfo('Installing GitHub CLI...');
        logInfo('📥 Download from: https://cli.github.com/');
        logInfo('💻 Or use package manager:');
        logInfo('   Windows: winget install GitHub.cli');
        logInfo('   macOS: brew install gh');
        logInfo('   Ubuntu/Debian: sudo apt install gh');
        logInfo('   CentOS/RHEL: sudo yum install gh');
        
        const waitForInstall = await askQuestion('Press Enter after installing GitHub CLI, or type "skip" to continue without it');
        if (waitForInstall === 'skip') {
            return false;
        }
        
        // Check again
        try {
            execSync('gh --version', { stdio: 'pipe' });
            logSuccess('GitHub CLI is now available');
        } catch (error) {
            logWarning('GitHub CLI still not available, continuing without it');
            return false;
        }
    }
    
    // Check if authenticated
    try {
        execSync('gh auth status', { stdio: 'pipe' });
        logSuccess('GitHub CLI is already authenticated');
        return true;
    } catch (error) {
        logWarning('GitHub CLI is not authenticated');
        logInfo('You need to authenticate with GitHub to create labels automatically.');
        logInfo('🔐 Run: gh auth login');
        logInfo('   This will open a browser for OAuth authentication');
        
        const waitForAuth = await askQuestion('Press Enter after authenticating, or type "skip" to continue without authentication');
        if (waitForAuth === 'skip') {
            return false;
        }
        
        // Check authentication again
        try {
            execSync('gh auth status', { stdio: 'pipe' });
            logSuccess('GitHub CLI is now authenticated');
            return true;
        } catch (error) {
            logWarning('GitHub CLI authentication failed, continuing without it');
            return false;
        }
    }
}

function createGitHubLabels() {
    const labels = [
        { name: 'phase:design', color: '0e8a16', description: 'Design phase - RFC creation and review' },
        { name: 'phase:impl', color: '1d76db', description: 'Implementation phase - coding and testing' },
        { name: 'phase:tests', color: 'fef2c0', description: 'Testing phase - validation and QA' },
        { name: 'status:wip', color: 'fbca04', description: 'Work in progress' },
        { name: 'status:needs-review', color: 'd93f0b', description: 'Ready for review' },
        { name: 'status:complete', color: '0e8a16', description: 'Completed and approved' },
        { name: 'status:changes-requested', color: 'd93f0b', description: 'Changes requested in review' },
        { name: 'ai-agent:cursor', color: '5319e7', description: 'Assigned to Cursor AI agent' },
        { name: 'ai-agent:claude', color: 'c2e0c6', description: 'Assigned to Claude AI agent' },
        { name: 'ai-agent:windsurf', color: 'bfdadc', description: 'Assigned to Windsurf AI agent' }
    ];

    logInfo('Creating GitHub labels...');
    
    for (const label of labels) {
        try {
            const command = `gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`;
            execSync(command, { stdio: 'pipe' });
            logSuccess(`Created label: ${label.name}`);
        } catch (error) {
            if (error.message.includes('already exists')) {
                logInfo(`Label already exists: ${label.name}`);
            } else {
                logWarning(`Failed to create label ${label.name}: ${error.message}`);
            }
        }
    }
    
    logSuccess('GitHub labels created');
}

function createLabelsConfigFile() {
    const labels = [
        { name: 'phase:design', color: '0e8a16', description: 'Design phase - RFC creation and review' },
        { name: 'phase:impl', color: '1d76db', description: 'Implementation phase - coding and testing' },
        { name: 'phase:tests', color: 'fef2c0', description: 'Testing phase - validation and QA' },
        { name: 'status:wip', color: 'fbca04', description: 'Work in progress' },
        { name: 'status:needs-review', color: 'd93f0b', description: 'Ready for review' },
        { name: 'status:complete', color: '0e8a16', description: 'Completed and approved' },
        { name: 'status:changes-requested', color: 'd93f0b', description: 'Changes requested in review' },
        { name: 'ai-agent:cursor', color: '5319e7', description: 'Assigned to Cursor AI agent' },
        { name: 'ai-agent:claude', color: 'c2e0c6', description: 'Assigned to Claude AI agent' },
        { name: 'ai-agent:windsurf', color: 'bfdadc', description: 'Assigned to Windsurf AI agent' }
    ];

    const labelsContent = JSON.stringify(labels, null, 2);
    writeFile('.github/labels.json', labelsContent);
    
    logSuccess('GitHub labels configuration file created');
    logInfo('You can import these labels using:');
    logInfo('1. GitHub web interface: Settings > Labels > Import labels');
    logInfo('2. Or manually create each label with the provided colors and descriptions');
}

function createGitHubWorkflows() {
    // Get the directory where this script is located (FRAIM package directory)
    const fraimDir = __dirname;
    
    // Copy actual workflow files from FRAIM/github folder
    const workflowsSrc = path.join(fraimDir, 'github');
    if (fs.existsSync(workflowsSrc)) {
        copyDirectory(workflowsSrc, '.github/workflows');
        logSuccess('GitHub workflows copied from FRAIM/github folder');
    } else {
        logWarning(`github folder not found at ${workflowsSrc}, skipping workflow creation`);
    }
}

function createAgentFolders() {
    // Get the directory where this script is located (FRAIM package directory)
    const fraimDir = __dirname;
    
    // Create .cursor folder at top level with all contents
    const cursorSrc = path.join(fraimDir, 'agents', 'cursor');
    if (fs.existsSync(cursorSrc)) {
        copyDirectory(cursorSrc, '.cursor');
        logSuccess('Created .cursor folder with all contents');
    } else {
        logWarning(`agents/cursor directory not found at ${cursorSrc}, skipping .cursor creation`);
    }

    // Create .windsurf folder at top level with all contents
    const windsurfSrc = path.join(fraimDir, 'agents', 'windsurf');
    if (fs.existsSync(windsurfSrc)) {
        copyDirectory(windsurfSrc, '.windsurf');
        logSuccess('Created .windsurf folder with all contents');
    } else {
        logWarning(`agents/windsurf directory not found at ${windsurfSrc}, skipping .windsurf creation`);
    }

    // Create CLAUDE.md at top level
    const claudeSrc = path.join(fraimDir, 'agents', 'claude', 'CLAUDE.md');
    if (fs.existsSync(claudeSrc)) {
        const claudeContent = fs.readFileSync(claudeSrc, 'utf8');
        writeFile('CLAUDE.md', claudeContent);
        logSuccess('Created CLAUDE.md at top level');
    } else {
        logWarning(`agents/claude/CLAUDE.md not found at ${claudeSrc}, skipping CLAUDE.md creation`);
    }
}

async function runWizard() {
    logHeader('🔮 FRAIM Interactive Setup Wizard');
    log('Welcome to the FRAIM setup wizard! I\'ll guide you through each step.\n');

    try {
        // Check prerequisites
        logStep('Step 1: Checking Prerequisites');
        
        // Check if we're in a git repository
        try {
            execSync('git rev-parse --git-dir', { stdio: 'pipe' });
            logSuccess('Running in a git repository');
        } catch (error) {
            logError('Not in a git repository');
            logInfo('Please run this command from within a git repository');
            return;
        }

        // Step 2: Project Structure
        logStep('Step 2: Project Structure');
        const setupStructure = await askQuestion('Would you like to create project structure (retrospectives, docs/rfcs with templates)?', 'y');
        
        if (setupStructure === 'y' || setupStructure === 'yes') {
            createProjectStructure();
        } else {
            logInfo('Skipping project structure setup');
        }

        // Step 3: AI Agent Setup
        logStep('Step 3: AI Agent Configuration');
        const setupAgents = await askQuestion('Would you like to set up AI agent configurations (.cursor, .windsurf, CLAUDE.md)?', 'y');
        
        if (setupAgents === 'y' || setupAgents === 'yes') {
            createAgentFolders();
        } else {
            logInfo('Skipping AI agent setup');
        }

        // Step 4: GitHub Workflows
        logStep('Step 4: GitHub Workflows');
        const setupWorkflows = await askQuestion('Would you like to set up GitHub workflows for automation?', 'y');
        
        if (setupWorkflows === 'y' || setupWorkflows === 'yes') {
            ensureDirectory('.github/workflows');
            createGitHubWorkflows();
        } else {
            logInfo('Skipping GitHub workflow setup');
        }

        // Step 5: GitHub Labels
        logStep('Step 5: GitHub Labels');
        const setupLabels = await askQuestion('Would you like to create GitHub labels for FRAIM?', 'y');
        
        if (setupLabels === 'y' || setupLabels === 'yes') {
            const ghAvailable = await setupGitHubCLI();
            if (ghAvailable) {
                createGitHubLabels();
            } else {
                logInfo('GitHub CLI not available - creating labels configuration file instead');
                createLabelsConfigFile();
            }
        } else {
            logInfo('Skipping GitHub label setup');
        }

        // Step 6: Summary
        logStep('Step 6: Setup Summary');
        logHeader('🎉 Setup Complete!');
        logSuccess('FRAIM has been successfully set up in your repository!');
        logInfo('Next steps:');
        logInfo('1. Commit and push these files to GitHub');
        logInfo('2. Import GitHub labels from .github/labels.json using the web interface');
        logInfo('3. Create your first issue with phase labels');
        logInfo('4. Start coordinating your AI agents!');
        
        logInfo('\n📚 Learn more about FRAIM:');
        logInfo('https://github.com/mathursrus/FRAIM');
        
        logInfo('\n🧠 Learn the RIGOR methodology:');
        logInfo('npx fraim-framework rigor');

    } catch (error) {
        logError(`Wizard failed: ${error.message}`);
        process.exit(1);
    }
}

async function runSetup() {
    logHeader('🚀 FRAIM Quick Setup');
    log('Setting up FRAIM in current repository...\n');

    try {
        // Check prerequisites
        try {
            execSync('git rev-parse --git-dir', { stdio: 'pipe' });
        } catch (error) {
            logError('Not in a git repository');
            logInfo('Please run this command from within a git repository');
            process.exit(1);
        }

        // Create everything at once
        createProjectStructure();
        ensureDirectory('.github/workflows');
        createAgentFolders();
        createGitHubWorkflows();
        
        // Check GitHub CLI availability for labels
        try {
            execSync('gh --version', { stdio: 'pipe' });
            try {
                execSync('gh auth status', { stdio: 'pipe' });
                logInfo('GitHub CLI available and authenticated - creating labels automatically');
                createGitHubLabels();
            } catch (error) {
                logWarning('GitHub CLI not authenticated - creating labels configuration file instead');
                createLabelsConfigFile();
            }
        } catch (error) {
            logInfo('GitHub CLI not available - creating labels configuration file instead');
            createLabelsConfigFile();
        }

        logHeader('🎉 Setup Complete!');
        logSuccess('FRAIM has been successfully set up in your repository!');
        logInfo('Next steps:');
        logInfo('1. Commit and push these files to GitHub');
        logInfo('2. Import GitHub labels from .github/labels.json using the web interface');
        logInfo('3. Create your first issue with phase labels');
        logInfo('4. Start coordinating your AI agents!');
        
        logInfo('\n📚 Learn more about FRAIM:');
        logInfo('https://github.com/mathursrus/FRAIM');
        
        logInfo('\n🧠 Learn the RIGOR methodology:');
        logInfo('npx fraim-framework rigor');

    } catch (error) {
        logError(`Setup failed: ${error.message}`);
        process.exit(1);
    }
}

// Run setup if this script is executed directly
if (require.main === module) {
    runSetup();
}

module.exports = { runSetup, runWizard, createProjectStructure };
