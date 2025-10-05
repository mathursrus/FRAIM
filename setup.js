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
    
    // Always copy the labels.json file
    fs.writeFileSync('labels.json', labelsContent);
    logSuccess('Created labels.json');
    
    // Check if we're in a git repository
    const isGitRepo = fs.existsSync('.git');
    
    if (isGitRepo) {
        // We're in a git repo, run the script
        try {
            const { execSync } = require('child_process');
            const os = require('os');
            
            if (os.platform() === 'win32') {
                // Windows: use bash to run the script
                execSync('bash .ai-agents/scripts/create-git-labels.sh labels.json', { stdio: 'inherit' });
            } else {
                // Unix-like: make executable and run
                execSync('chmod +x .ai-agents/scripts/create-git-labels.sh');
                execSync('.ai-agents/scripts/create-git-labels.sh labels.json', { stdio: 'inherit' });
            }
            logSuccess('Created GitHub labels');
        } catch (error) {
            console.log('⚠️  Could not create GitHub labels automatically. Run manually:');
            if (require('os').platform() === 'win32') {
                console.log('   bash .ai-agents/scripts/create-git-labels.sh labels.json');
            } else {
                console.log('   .ai-agents/scripts/create-git-labels.sh labels.json');
            }
        }
    } else {
        // Not in a git repo, give instructions
        console.log('📝 Note: Not in a git repository. To create GitHub labels:');
        console.log('   1. Initialize git repo: git init');
        console.log('   2. Create GitHub repo and connect it');
        if (require('os').platform() === 'win32') {
            console.log('   3. Run: bash .ai-agents/scripts/create-git-labels.sh labels.json');
        } else {
            console.log('   3. Run: .ai-agents/scripts/create-git-labels.sh labels.json');
        }
    }
}

// Main setup function
function runSetup() {
    try {
        // Copy full directories
        const directoriesToCopy = [
            '.ai-agents',
            '.cursor',
            '.windsurf',
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
        
        console.log('\n✅ FRAIM setup complete!');
        console.log('🎯 Your repository is now ready for AI agent management.');
        console.log('📚 Next steps:');
        console.log('   1. Customize .ai-agents/rules/architecture.md for your project');
        console.log('   2. Update .ai-agents/scripts/cleanup-branch.ts with your cleanup logic');
        console.log('   3. Copy scripts from sample_package.json to your package.json');
        console.log('   4. Start creating issues with ai-agent labels!');
        
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