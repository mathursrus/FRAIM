# Local Development Guidelines

## INTENT
Enable safe parallel development through strict workspace separation, preventing conflicts between agents and maintaining code integrity.

## PRINCIPLES
- **Workspace Isolation**: Each agent works in their own cloned repository folder
- **Branch Discipline**: Always work on feature branches, never push to master
- **Timeout Management**: Use exec-with-timeout for all commands to prevent hangs
- **Coordination**: Use GitHub issues and PRs for agent communication

## CORE RULES

### Development Environment
- Use local file system for development work in your own cloned repository folder
- Push to feature branches only; never push to master
- Do NOT open PRs; push and let Actions open/update Draft PRs
- Always work in your own cloned repository folder.
All your work **MUST** be in your folder.
- Coordinate with other agents through GitHub issues and PRs
- Each agent works independently in their own folder to enable true parallel development
- Run every command using `npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 30 -- <your command>` to prevent hangs in the terminal. You can adjust the timeout if the task is expected to run longer, but always have a timeout.

## CRITICAL RULE: Absolute Workspace Separation

### Main Workspace: READ-ONLY
- **Directory**: `{PROJECT_NAME}` (no issue number)
- **Purpose**: Reference only - for reading existing code
- **PROHIBITION**: **NEVER** create, edit, or modify ANY files here

### Local Clone: WORK-ONLY  
- **Directory**: `{PROJECT_NAME} - Issue {issue_number}` (includes issue number)
- **Purpose**: All development work happens here exclusively
- **Rule**: ALL file operations must be within this directory

## WORKSPACE OPERATIONS

### Safe Operations (READ-ONLY)
- `read_file()` from main workspace for reference
- `grep_search()` in main workspace for analysis
- `list_dir()` in main workspace for exploration
- `find_by_name()` in main workspace for discovery

### Work Operations (LOCAL CLONE ONLY)
- `edit_file()` - ONLY in your local clone
- `write_to_file()` - ONLY in your local clone
- `delete_file()` - ONLY in your local clone
- All git operations - ONLY in your local clone

### NEVER Use These Patterns:
```
❌ edit_file("{PROJECT_NAME}/...")           # Main workspace
❌ edit_file("../{PROJECT_NAME}/...")        # Main workspace via relative path
❌ edit_file(".windsurf/...")                    # Main workspace config
❌ Any path containing main workspace name
```

### ALWAYS Use These Patterns:
```
✅ edit_file("src/...")                      # Relative path in local clone
✅ edit_file("./src/...")                    # Explicit relative path
✅ read_file("../{PROJECT_NAME}/src/...")    # Reference main workspace
✅ Working directory check before operations
```

## COMMAND EXECUTION

### Timeout Wrapper (MANDATORY)
ALL commands must use the timeout wrapper:

```bash
# Standard timeout (30 seconds)
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 30 -- npm install

# Extended timeout for long operations
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 300 -- npm run build

# Very long operations (tests, servers)
npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 1800 -- npm run test-all
```

### Timeout Guidelines
- **Quick commands**: 30 seconds (npm install, git operations)
- **Build operations**: 300 seconds (5 minutes)
- **Test suites**: 1800 seconds (30 minutes)
- **Development servers**: 3600 seconds (1 hour)

## DIRECTORY STRUCTURE RULES

### Correct Naming Convention:
- **Main Workspace**: `{PROJECT_NAME}` (READ-ONLY)
- **Local Clone**: `{PROJECT_NAME} - Issue {issue_number}` (WORK HERE)

**The issue number in directory name is a visual reminder you're in the right place.**

### Directory Verification
Before ANY file operation, verify you're in the correct directory:

```bash
# Check current directory
pwd

# Verify you're in local clone (should contain issue number)
basename "$(pwd)" | grep -q "Issue [0-9]"
```

## BRANCH MANAGEMENT

### Branch Naming Convention
- Format: `feature/{issue_number}-{kebab-case-title}`
- Example: `feature/123-fix-authentication-bug`
- Always include issue number for traceability

### Branch Operations
```bash
# Create and switch to feature branch
git checkout -b feature/123-fix-authentication-bug

# Push branch to origin
git push -u origin feature/123-fix-authentication-bug

# Never push to master
git push origin master  # ❌ FORBIDDEN
```

## COORDINATION PATTERNS

### Agent Communication
- Use GitHub issues for task coordination
- Use PR comments for code review feedback
- Use issue labels for status tracking
- Never directly modify another agent's work

### Status Updates
- Update issue labels to reflect current phase
- Add comments to issues with progress updates
- Link PRs to issues for traceability
- Use draft PRs for work-in-progress

## SAFETY CHECKS

### Pre-Operation Verification
1. **Directory Check**: Confirm you're in local clone
2. **Branch Check**: Confirm you're on feature branch
3. **File Path Check**: Confirm relative paths only
4. **Timeout Check**: Confirm command has timeout wrapper

### Example Verification Script
```bash
# Verify safe working environment
CURRENT_DIR=$(basename "$(pwd)")
CURRENT_BRANCH=$(git branch --show-current)

if [[ ! "$CURRENT_DIR" =~ "Issue [0-9]+" ]]; then
    echo "❌ Not in local clone directory"
    exit 1
fi

if [[ "$CURRENT_BRANCH" == "master" ]] || [[ "$CURRENT_BRANCH" == "main" ]]; then
    echo "❌ Working on main branch"
    exit 1
fi

echo "✅ Safe working environment confirmed"
```

## EXAMPLES

### Good: Proper Workspace Usage
```
✅ Working Directory: /path/to/{PROJECT_NAME} - Issue 84
✅ File Operation: edit_file("src/calendar-api.ts")
✅ Branch Check: feature/84-fix-calendar-sync
✅ Path Verification: Relative path, no "../" patterns
✅ Command: npx tsx .ai-agents/scripts/exec-with-timeout.ts --timeout 30 -- npm test
```

### Bad: Workspace Violations
```
❌ Working Directory: /path/to/{PROJECT_NAME} (main workspace)
❌ File Operation: edit_file("src/calendar-api.ts")
❌ Branch Check: main
❌ Path Verification: Working in main workspace
❌ Command: npm test (no timeout wrapper)
```

### Good: Reference Operations
```
✅ Read from main workspace: read_file("../{PROJECT_NAME}/docs/README.md")
✅ Search main workspace: grep("calendar", "../{PROJECT_NAME}/src/")
✅ List main workspace: list_dir("../{PROJECT_NAME}/")
Result: Safe reference without modification
```

### Bad: Modification in Main Workspace
```
❌ Edit main workspace: edit_file("../{PROJECT_NAME}/src/calendar-api.ts")
❌ Delete main workspace: delete_file("../{PROJECT_NAME}/test-file.ts")
❌ Search replace main: search_replace("../{PROJECT_NAME}/...")
Result: Violates workspace separation
```

## CLEANUP

### End of Work Session
When work is complete, clean up your local clone:

```bash
# Navigate out of local clone
cd ..

# Remove your local clone folder
rm -rf "{PROJECT_NAME} - Issue {issue_number}"
```

## TROUBLESHOOTING

### Common Issues
1. **Permission Denied**: Check if you're in the right directory
2. **Git Conflicts**: Ensure you're on feature branch, not master
3. **Command Hangs**: Always use timeout wrapper
4. **File Not Found**: Verify relative paths and working directory

### Recovery Steps
1. Stop all running processes
2. Navigate to correct local clone directory
3. Check git status and current branch
4. Verify file paths are relative
5. Use timeout wrapper for all commands

Respect CODEOWNERS; don't modify auth/CI without approval.