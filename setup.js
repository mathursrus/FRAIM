const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

// Utility functions
function ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function logSuccess(message) {
    console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

function logError(message) {
    console.log(`${colors.red}✗ ${message}${colors.reset}`);
}

// Copy directory recursively
function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) {
        console.log(`⚠️  Warning: ${src} not found in package`);
        return;
    }
    
    ensureDirectory(dest);
    const items = fs.readdirSync(src);
    
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy single file
function copyFile(src, dest) {
    if (!fs.existsSync(src)) {
        console.log(`⚠️  Warning: ${src} not found in package`);
        return;
    }
    
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    ensureDirectory(destDir);
    
    fs.copyFileSync(src, dest);
}

// Create GitHub labels from labels.json
function createGitHubLabels() {
    const labelsPath = path.join(__dirname, 'labels.json');
    if (!fs.existsSync(labelsPath)) {
        console.log('⚠️  Warning: labels.json not found in package');
        return;
    }
    
    const labelsContent = fs.readFileSync(labelsPath, 'utf8');
    const labels = JSON.parse(labelsContent);
    
    // Create labels.json in the target directory
    fs.writeFileSync('labels.json', labelsContent);
    logSuccess('Created labels.json');
}

// Create CODEOWNERS file
function createCodeOwners() {
    const codeownersContent = `# This file defines the code owners for the repository
# Code owners are automatically requested for review when someone opens a PR that modifies code they own
# See: https://docs.github.com/en/repositories/managing-your-codebase-in-github/about-code-owners

# Global ownership - all files
* @${process.env.USER || 'repo-owner'}

# AI agents rules and workflows
/.ai-agents/ @${process.env.USER || 'repo-owner'}

# GitHub workflows
/.github/ @${process.env.USER || 'repo-owner'}
`;
    
    fs.writeFileSync('CODEOWNERS', codeownersContent);
    logSuccess('Created CODEOWNERS file');
}

// Create PR template
function createPRTemplate() {
    const prTemplateContent = `## Summary
Brief description of changes

## Changes Made
- [ ] Change 1
- [ ] Change 2

## Testing
- [ ] Test 1
- [ ] Test 2

## Related Issues
Closes #

## Screenshots (if applicable)
<!-- Add screenshots here -->

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
`;
    
    ensureDirectory('.github');
    fs.writeFileSync('.github/pull_request_template.md', prTemplateContent);
    logSuccess('Created PR template');
}

// Main setup function
function runSetup() {
    console.log('🚀 Setting up FRAIM in current repository...\n');
    
    try {
        // Copy full directories
        const directoriesToCopy = [
            '.ai-agents',
            '.github/workflows',
            'examples'
        ];
        
        directoriesToCopy.forEach(dir => {
            const srcPath = path.join(__dirname, dir);
            const destPath = dir;
            copyDirectory(srcPath, destPath);
            logSuccess(`Copied ${dir}/`);
        });
        
        // Copy individual files
        const filesToCopy = [
            'sample_package.json',
            'test-utils.ts',
            'tsconfig.json'
        ];
        
        filesToCopy.forEach(file => {
            const srcPath = path.join(__dirname, file);
            copyFile(srcPath, file);
            logSuccess(`Copied ${file}`);
        });
        
        // Create special files
        createGitHubLabels();
        createCodeOwners();
        createPRTemplate();
        
        console.log('\n✅ FRAIM setup complete!');
        console.log('🎯 Your repository is now ready for AI agent management.');
        console.log('📚 Next steps:');
        console.log('   1. Customize .ai-agents/rules/architecture.md for your project');
        console.log('   2. Update .ai-agents/scripts/cleanup-branch.ts with your cleanup logic');
        console.log('   3. Copy scripts from sample_package.json to your package.json');
        console.log('   4. Start creating issues with phase labels!');
        
    } catch (error) {
        logError(`Setup failed: ${error.message}`);
        throw error;
    }
}

// If this file is run directly, execute setup
if (require.main === module) {
    runSetup();
}

module.exports = { runSetup };