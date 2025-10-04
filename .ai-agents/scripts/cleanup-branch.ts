#!/usr/bin/env npx tsx

import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ override: true });

interface CleanupOptions {
  branchName?: string;
  force?: boolean;
  skipProjectCleanup?: boolean;
  skipGit?: boolean;
}

class BranchCleanup {
  private options: CleanupOptions;

  constructor(options: CleanupOptions = {}) {
    this.options = {
      branchName: options.branchName,
      force: options.force || false,
      skipProjectCleanup: options.skipProjectCleanup || false,
      skipGit: options.skipGit || false,
    };
  }

  private async insertYourCodeHere(branchName: string): Promise<void> {
    // add project specific cleanup code here   
  }


  private log(message: string, level: 'info' | 'warn' | 'error' | 'success' = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: 'ℹ️ ',
      warn: '⚠️ ',
      error: '❌',
      success: '✅'
    }[level];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  private async executeCommand(command: string, description: string): Promise<string> {
    this.log(`Executing: ${description}`);

    try {
      const result = execSync(command, { 
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: process.cwd()
      });
      this.log(`Success: ${description}`, 'success');
      return result;
    } catch (error: any) {
      this.log(`Failed: ${description} - ${error.message}`, 'error');
      throw error;
    }
  }

  private async getCurrentBranch(): Promise<string> {
    try {
      const result = await this.executeCommand('git branch --show-current', 'Get current branch');
      return result.trim();
    } catch (error) {
      this.log('Could not determine current branch', 'warn');
      return 'unknown';
    }
  }

  private async getBranchName(): Promise<string> {
    if (this.options.branchName) {
      return this.options.branchName;
    }

    const currentBranch = await this.getCurrentBranch();
    if (currentBranch === 'master' || currentBranch === 'main') {
      throw new Error('Cannot cleanup master/main branch. Please specify a feature branch name.');
    }

    return currentBranch;
  }

  private async checkBranchExists(branchName: string, remote: boolean = false): Promise<boolean> {
    try {
      const command = remote 
        ? `git ls-remote --heads origin ${branchName}`
        : `git branch --list ${branchName}`;
      
      const result = await this.executeCommand(command, `Check if ${remote ? 'remote' : 'local'} branch exists`);
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  private async doProjectSpecificCleanup(branchName: string): Promise<void> {
    try {  
        if (this.options.skipProjectCleanup) {
        this.log('Skipping project-specific cleanup', 'warn');
        return;
        }

        this.log('Starting project-specific cleanup...');

        await this.insertYourCodeHere(branchName);

        this.log('Project-specific cleanup completed successfully', 'success');
    } catch (error: any) {
      this.log(`Project-specific cleanup failed: ${error.message}`, 'error');
      if (!this.options.force) {
        throw error;
      }
    }
  }

  private async cleanupGitBranches(branchName: string): Promise<void> {
    if (this.options.skipGit) {
      this.log('Skipping Git cleanup', 'warn');
      return;
    }

    this.log(`Starting Git branch cleanup for: ${branchName}`);

    // Check if we're on the branch we want to delete
    const currentBranch = await this.getCurrentBranch();
    if (currentBranch === branchName) {
      this.log(`Currently on branch ${branchName}, switching to master first`, 'warn');
      await this.executeCommand('git checkout master', 'Switch to master branch');
    }

    // Delete remote branch
    const remoteExists = await this.checkBranchExists(branchName, true);
    if (remoteExists) {
      this.log(`Deleting remote branch: origin/${branchName}`);
      await this.executeCommand(`git push origin --delete ${branchName}`, `Delete remote branch ${branchName}`);
    } else {
      this.log(`Remote branch origin/${branchName} does not exist`, 'info');
    }

    // Delete local branch
    const localExists = await this.checkBranchExists(branchName, false);
    if (localExists) {
      this.log(`Deleting local branch: ${branchName}`);
      await this.executeCommand(`git branch -D ${branchName}`, `Delete local branch ${branchName}`);
    } else {
      this.log(`Local branch ${branchName} does not exist`, 'info');
    }

    // Clean up any untracked files
    this.log('Cleaning up untracked files...');
    await this.executeCommand('git clean -fd', 'Remove untracked files and directories');

    // Reset any uncommitted changes
    this.log('Resetting uncommitted changes...');
    await this.executeCommand('git reset --hard HEAD', 'Reset to HEAD');

    this.log('Git branch cleanup completed', 'success');
  }


  private async verifyCleanup(branchName: string): Promise<void> {
    this.log('Verifying cleanup...');

    // Verify branch deletion
    const remoteExists = await this.checkBranchExists(branchName, true);
    const localExists = await this.checkBranchExists(branchName, false);

    if (remoteExists || localExists) {
      this.log(`Warning: Branch ${branchName} still exists (remote: ${remoteExists}, local: ${localExists})`, 'warn');
    } else {
      this.log(`Branch ${branchName} successfully deleted`, 'success');
    }

    // Verify we're on master
    const currentBranch = await this.getCurrentBranch();
    if (currentBranch === 'master' || currentBranch === 'main') {
      this.log('Currently on master/main branch', 'success');
    } else {
      this.log(`Warning: Not on master branch, currently on ${currentBranch}`, 'warn');
    }

    this.log('Cleanup verification completed', 'success');
  }

  async cleanup(): Promise<void> {
    try {
      this.log('🚀 Starting branch cleanup process...');

      const branchName = await this.getBranchName();
      this.log(`Target branch: ${branchName}`);

      // Step 1: Project-specific cleanup
      await this.doProjectSpecificCleanup(branchName);

      // Step 2: Git branch cleanup
      await this.cleanupGitBranches(branchName);

      // Step 3: Verification
      await this.verifyCleanup(branchName);

      this.log('🎉 Branch cleanup completed successfully!', 'success');

    } catch (error: any) {
      this.log(`Cleanup failed: ${error.message}`, 'error');
      if (!this.options.force) {
        process.exit(1);
      }
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: CleanupOptions = {};

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  switch (arg) {
    case '--branch':
    case '-b':
      options.branchName = args[++i];
      break;
    case '--force':
    case '-f':
      options.force = true;
      break;
    case '--skip-project-cleanup':
      options.skipProjectCleanup = true;
      break;
    case '--skip-git':
      options.skipGit = true;
      break;
    case '--help':
    case '-h':
      console.log(`
🧹 Branch Cleanup Script

Usage:
  npx tsx .ai-agents/scripts/cleanup-branch.ts [options]

Options:
  --branch, -b <name>              Specific branch name to cleanup (default: current branch)
  --force, -f                      Continue even if some operations fail
  --skip-project-cleanup           Skip project-specific cleanup
  --skip-git                       Skip Git branch deletion
  --help, -h                       Show this help message

Examples:
  # Cleanup current branch with default settings
  npx tsx .ai-agents/scripts/cleanup-branch.ts

  # Cleanup specific branch
  npx tsx .ai-agents/scripts/cleanup-branch.ts --branch feature/123

  # Force cleanup even if some operations fail
  npx tsx .ai-agents/scripts/cleanup-branch.ts --force

  # Skip project-specific cleanup (only do Git cleanup)
  npx tsx .ai-agents/scripts/cleanup-branch.ts --skip-project-cleanup

This script performs the following cleanup operations:
1. 🗄️  Project-specific cleanup (calls existing cleanup-mongo-schemas.ts with branch-based pattern)
2. 🌿 Git branch deletion (remote and local)
3. ✅ Verification of cleanup completion

⚠️  WARNING: This script will permanently delete branches and data!
      `);
      process.exit(0);
  }
}

// Run the cleanup
const cleanup = new BranchCleanup(options);
cleanup.cleanup();
