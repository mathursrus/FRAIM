---
trigger: manual
---

# Local Development with Remote Coordination

- Use local file system for development work in your own cloned repository folder
- Push to feature branches only; never push to master
- Do NOT open PRs; push and let Actions open/update Draft PRs
- Always work in your own cloned repository folder: `git clone <repo> "<repo> - Issue {issue_number}"`
- After you create the clone, do not forget to change into that working directory. All your work **MUST** be in your working directory.
- Coordinate with other agents through GitHub issues and PRs
- Each agent works independently in their own folder to enable true parallel development

## CRITICAL RULE: Absolute Workspace Separation

### Local Clone: WORK-ONLY  
- **Directory**: `<repo> - Issue <issue number>`
- **Purpose**: All development work happens here exclusively
- **Rule**: ALL file operations must be within this directory

## Mandatory Pre-File-Operation Checklist

**Before ANY file operation (edit_file, delete_file, etc.), verify:**

1. ✅ **Directory Check**: `pwd` shows local clone with issue number in path
2. ✅ **Path Verification**: File path is relative (no "../" or main workspace name)  
3. ✅ **Branch Check**: `git branch` shows correct feature branch
4. ❌ **If ANY check fails**: STOP immediately and fix location

**This checklist is MANDATORY, not optional.**


## Enhanced Stop Conditions

**Stop ALL work immediately if:**
- You create a file and it appears in main workspace
- You use edit_file with "../" paths
- You work in directory without issue number in name  
- `pwd` shows main workspace path
- Any file operation targets main workspace

**Take corrective action before continuing.**

## Workspace Validation Commands

**Before starting work, run:**
```bash
echo "Working in: $(pwd)"
echo "Should contain issue number in path"
git branch
echo "Should show feature branch"
```

**If output doesn't match expectations, fix before proceeding.**

## Tool Usage Restrictions

### File Operations - Local Only
- `edit_file()` - ONLY with relative paths in local repo
- `delete_file()` - ONLY within local repo
- `search_replace()` - ONLY on local repo files

### Reference Operations - Main Workspace OK  
- `read_file()` - OK to read from main workspace for reference
- `list_dir()` - OK to explore main workspace structure
- `grep()` - OK to search main workspace for patterns

## Violation Recovery Process

**If you violate workspace boundaries:**

1. **Stop immediately** - Do not continue file operations
2. **Assess damage** - Check what was created in wrong location  
3. **Clean up** - Delete files created in main workspace
4. **Recreate correctly** - Recreate files in local repo only
5. **Document violation** - Update post-mortem with details


## Enhanced Output Template

```
Summary:
  - Work completed in local repository: [path]
  - Files created/modified: [list with relative paths]
  - Workspace violations: [none/details if any occurred]

Artifacts:
  - Branch: [URL]
  - Local directory: [full path to local clone]
```

## Emergency Safeguards

**If assistant shows signs of workspace confusion:**
- User should immediately clarify working directory
- Assistant should run `pwd` and verify location
- All file operations should pause until location confirmed
- Assistant should explicitly state file paths being used

---

**Bottom Line**: The local development workflow requires absolute discipline about workspace boundaries. 
