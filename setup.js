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