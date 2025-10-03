# Local Development with Remote Coordination

## INTENT
To enable safe parallel development by maintaining strict workspace separation, ensuring agents work independently in isolated environments while coordinating through GitHub, preventing workspace conflicts and data loss.

## PRINCIPLES
- **Workspace Isolation**: Each agent works in their own cloned directory
- **Reference Only**: Main workspace is read-only for reference
- **Parallel Safety**: No conflicts between agents working simultaneously
- **Git Coordination**: Use GitHub for coordination, not shared files
- **Discipline Required**: Strict adherence to workspace boundaries

## CORE WORKFLOW
- Use local file system for development work in your own cloned repository folder
- Push to feature branches only; never push to master
- Do NOT open PRs; push and let Actions open/update Draft PRs
- Always work in your own cloned repository folder: `git clone https://github.com/mathursrus/Ashley-Calendar-AI.git "Ashley Calendar AI - Issue {issue_number}"`
- After you create the clone, do not forget to change into that working directory. All your work **MUST** be in your working directory.
- Coordinate with other agents through GitHub issues and PRs
- Each agent works independently in their own folder to enable true parallel development
- Run every command using `npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- <your command>` to prevent hangs in the terminal. You can adjust the timeout if the task is expected to run longer, but always have a timeout.

## CRITICAL RULE: Absolute Workspace Separation

### Main Workspace: READ-ONLY
- **Directory**: `Ashley Calendar AI` (no issue number)
- **Purpose**: Reference only - for reading existing code
- **PROHIBITION**: **NEVER** create, edit, or modify ANY files here

### Local Clone: WORK-ONLY  
- **Directory**: `Ashley Calendar AI - Issue 84` (includes issue number)
- **Purpose**: All development work happens here exclusively
- **Rule**: ALL file operations must be within this directory

## Mandatory Pre-File-Operation Checklist

**Before ANY file operation (edit_file, delete_file, etc.), verify:**

1. ✅ **Directory Check**: `pwd` shows local clone with issue number in path
2. ✅ **Path Verification**: File path is relative (no "../" or main workspace name)  
3. ✅ **Branch Check**: `git branch` shows correct feature branch
4. ❌ **If ANY check fails**: STOP immediately and fix location

**This checklist is MANDATORY, not optional.**

## MANDATORY PRE-COMMIT VALIDATION
Before ANY commit, run: `git branch` and verify NOT on master

## Prohibited File Operations

### NEVER Use These Patterns:
```
❌ edit_file("Ashley Calendar AI/...")           # Main workspace
❌ edit_file("../Ashley Calendar AI/...")        # Main workspace via relative path
❌ edit_file(".windsurf/...")                    # Main workspace config
❌ Any path containing main workspace name
```

### ONLY Use These Patterns:
```
✅ edit_file("src/...")                          # Local repo relative path
✅ edit_file("docs/...")                         # Local repo relative path  
✅ edit_file("test-*.ts")                        # Local repo files
✅ edit_file("postmortems/...")                  # Local repo subdirectories
```

## Enhanced Stop Conditions

**Stop ALL work immediately if:**
- You create a file and it appears in main workspace
- You use edit_file with "../" paths
- You work in directory without issue number in name  
- `pwd` shows main workspace path
- Any file operation targets main workspace

**Take corrective action before continuing.**

## Environment Configuration

**CRITICAL**: Always use `dotenv.config({ override: true })` when loading environment variables:

```typescript
// ✅ CORRECT - Always override environment variables
dotenv.config({ override: true });

// ❌ WRONG - May not override existing environment variables
dotenv.config();
```

**Reason**: Windows environment variables take precedence over .env files by default. Using `{ override: true }` ensures .env values override system environment variables, which is essential for consistent local development behavior.

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

## Directory Structure Rules

### Correct Naming Convention:
- **Main Workspace**: `Ashley Calendar AI` (READ-ONLY)
- **Local Clone**: `Ashley Calendar AI - Issue <>` (WORK HERE)

**The issue number in directory name is a visual reminder you're in the right place.**

## Commit and Push Rules

1. **No commits to master without approval**: Do not commit to master unless explicitly requested
2. **Work locally first**: Complete all work in local repo before any commits
4. **Push to feature branches only**: Never push to master without confirmation

## Violation Recovery Process

**If you violate workspace boundaries:**

1. **Stop immediately** - Do not continue file operations
2. **Assess damage** - Check what was created in wrong location  
3. **Clean up** - Delete files created in main workspace
4. **Recreate correctly** - Recreate files in local repo only
5. **Document violation** - Update post-mortem with details

## Assistant Behavioral Requirements

**The assistant must:**
1. **Always verify working directory** before file operations
2. **Never use "../" paths** in file tools
3. **Refuse to edit files** in main workspace  
4. **Ask for confirmation** if working directory looks suspicious
5. **Stop immediately** if workspace violation detected
6. **Default to local repo** for all file operations



## Server Management and Port Handling

### Issue-Based Port Management
- **Port Calculation**: Each issue uses port `8080 + issue_number`
- **Example**: Issue #253 uses port 8333 (8080 + 253)
- **Purpose**: Prevents port conflicts between different issue development sessions
- **Implementation**: Server automatically detects issue number from git branch name

### Server Startup Protocol
**ALWAYS use this pattern for starting development servers:**

```bash
# 1. Start server in background with logging
npm run dev &

# 2. Wait for startup (3-5 seconds)
sleep 3

# 3. Check server logs for errors
tail -20 server.log

# 4. Verify server is running on correct port
netstat -ano | findstr :<port>
```

**Note**: If the server is already running, the second `npm run dev` command will exit with code 1 due to port conflict detection. This is expected behavior.

### Server Error Detection

**Agents must check `server.log` for:**
- Database connection issues
- Missing credentials (OAuth tokens, client secrets)
- Port conflict errors
- Schema detection issues
- Orchestrator startup failures
- API endpoint errors
- TypeScript compilation errors
- Environment variable issues
- Any error messages or stack traces 

### Server Process Management
**Essential commands for managing server processes:**

```bash
# Check what's using a specific port
netstat -ano | findstr :<port>

# Kill a specific process by PID
taskkill //PID <pid> //F

# Kill all Node.js processes (use with caution)
taskkill //IM node.exe //F

# Check if server is running
curl -s http://localhost:<port>/orchestrator/status
```

### Database Debugging Patterns

**When debugging database or service integration issues, use these proven patterns:**

#### 1. Action-Database Verification Pattern
**Purpose**: Verify that actions taken by services actually persist in the database.

**Pattern**:
1. Take an action (e.g., create HITL record, update calendar event)
2. Query database directly to verify the action was recorded
3. Compare expected vs actual database state

**Example**:
```bash
# 1. Trigger an action (e.g., process email via orchestrator)
curl -X POST http://localhost:8328/orchestrator/process-email -d '{"emailId": "test-123"}'

# 2. Check database to see if HITL record was created
check directly in DB

# 3. Verify the record has expected fields and values
```

#### 2. Database State Manipulation for Testing
**Purpose**: Modify database state to test specific scenarios without complex setup.

**Pattern**:
1. Identify the database state needed for testing
2. Directly modify database records to simulate desired state
3. Run the action and verify it behaves correctly with the modified state

**Example**:
```bash
# 1. Set action_taken to false in HITL record to simulate pending approval
directly set field in db

# 2. Run action orchestrator to test pending approval scenario
npx tsx scripts/hitl/trigger-action-orchestrator.ts

# 3. Verify the orchestrator processes the record correctly
```

#### 3. Service Call Tracking Pattern
**Purpose**: Debug service integration by tracking what services are called and with what parameters.

**Pattern**:
1. Add logging to service methods to track calls
2. Run the action and capture the logs
3. Verify services are called with correct parameters

**Example**:
```typescript
// Add to service method
console.log(`🔍 DEBUG: ${methodName} called with:`, JSON.stringify(params, null, 2));

// Run action and check logs
npm run dev &
curl -X POST http://localhost:8328/orchestrator/process-email -d '{"emailId": "test-123"}'
tail -50 server.log | grep "🔍 DEBUG"
```

#### 4. Mock Service Validation Pattern
**Purpose**: Test service interactions in isolation by validating mock service calls.

**Pattern**:
1. Create mock services that track method calls and parameters
2. Run the action with mocked services
3. Verify mock services received expected calls with correct parameters

**Example**:
```typescript
const mockCalendarService = {
  calls: [],
  updateCalendarEvent: async (request) => {
    mockCalendarService.calls.push({ method: 'updateCalendarEvent', request });
    return { success: true };
  }
};

// After running action, validate calls
const updateCall = mockCalendarService.calls.find(call => call.method === 'updateCalendarEvent');
if (!updateCall) throw new Error('Expected updateCalendarEvent to be called');
if (updateCall.request.eventId !== expectedId) throw new Error('Wrong event ID');
```




### Mandatory Server Validation
**Before declaring work complete, agents MUST:**
1. ✅ **Ensure server is running successfully** on issue-specific port
2. ✅ **No errors in server.log** 
3. ✅ **API endpoints respond** correctly
4. ✅ **Database connections work** (if applicable)
5. ✅ **All new functionality tested** and working
6. ✅ **Smoke tests run** and working



## EXAMPLES

### Good: Proper Workspace Usage
```
✅ Working Directory: /path/to/Ashley Calendar AI - Issue 84
✅ File Operation: edit_file("src/calendar-api.ts")
✅ Branch Check: feature/84-fix-calendar-sync
✅ Path Verification: Relative path, no "../" patterns
Result: Safe parallel development
```

### Bad: Workspace Violations
```
❌ Working Directory: /path/to/Ashley Calendar AI (main workspace)
❌ File Operation: edit_file("src/calendar-api.ts")
❌ Branch Check: main
❌ Path Verification: Working in main workspace
Result: Potential conflicts with other agents
```

### Good: Reference Operations
```
✅ Read from main workspace: read_file("../Ashley Calendar AI/docs/README.md")
✅ Search main workspace: grep("calendar", "../Ashley Calendar AI/src/")
✅ List main workspace: list_dir("../Ashley Calendar AI/")
Result: Safe reference without modification
```

### Bad: Modification in Main Workspace
```
❌ Edit main workspace: edit_file("../Ashley Calendar AI/src/calendar-api.ts")
❌ Delete main workspace: delete_file("../Ashley Calendar AI/test-file.ts")
❌ Search replace main: search_replace("../Ashley Calendar AI/...")
Result: Violates workspace separation
```

## Emergency Safeguards

**If assistant shows signs of workspace confusion:**
- User should immediately clarify working directory
- Assistant should run `pwd` and verify location
- All file operations should pause until location confirmed
- Assistant should explicitly state file paths being used

---

**Bottom Line**: The local development workflow requires absolute discipline about workspace boundaries AND proper server management with issue-based port allocation.