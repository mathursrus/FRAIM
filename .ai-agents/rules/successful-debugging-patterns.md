# Successful Debugging Patterns for Complex Integrations

## INTENT
To provide agents with proven patterns for debugging complex integrations, especially OAuth flows, API integrations, and multi-layer systems that require both UI automation and backend validation.

## PRINCIPLES
- **Multi-Layer Validation**: Always validate at UI, API, and Database layers
- **Iterative Enhancement**: Continuously refine approaches based on real-time feedback
- **Appropriate Timeout Management**: Use different timeouts for different operation types
- **Real-Time Monitoring**: Monitor logs and database state during complex operations
- **Visual Debugging**: Use screenshots and visual feedback to understand UI state

## CORE DEBUGGING PATTERN

### The "Repro -> Analyze → Implement → Test → Validate → Document → VERIFY COMPLETENESS" Pattern

```
1. REPRO: Reproduce the issue in a controlled environment. This can be manual using Playwright for UI issues, Curl for API issues, etc; or it can be through existing test cases. Run only the test case that fails. Mark it with tag `failing`, then run `npm run test-failing <test-suite>`
2. ANALYZE: Use tools to examine actual codebase (grep_search, Read)
3. IMPLEMENT: Make targeted changes based on real code analysis
4. TEST: Run the single test and ensure it passes. Then run comprehensive tests for evidence
5. VALIDATE: Verify functionality works end-to-end
6. DOCUMENT: Create test cases that replicate the flow and validate end state
7. VERIFY COMPLETENESS: Run comprehensive verification checklist (NEW CRITICAL STEP)
8. ITERATE: Refine based on real feedback and evidence
```

### **NEW: Mandatory Completeness Verification Pattern**

Before declaring ANY work complete, **MUST** follow this systematic verification:

```bash
# Step 1: Compilation Verification
timeout 30s npx tsc --noEmit --skipLibCheck
# MUST show 0 errors - fix any errors before proceeding

# Step 2: Build Verification (if build script exists)
timeout 60s npm run build
# MUST complete successfully

# Step 3: Comprehensive Search Verification
# Search for ALL possible references using multiple patterns:
grep_search --SearchPath . --Query "OldClassName" --MatchPerLine true
grep_search --SearchPath . --Query "import.*OldClassName" --IsRegex true --MatchPerLine true  
grep_search --SearchPath . --Query "old-filename" --MatchPerLine true
grep_search --SearchPath . --Query "oldMethodName" --MatchPerLine true

# Step 4: Test Execution with Timeout
timeout 30s npx tsx --test --test-reporter tap test-relevant-file.ts

# Step 5: End-to-End Functionality Check
# Verify main application workflows still work
```

### Enhanced Multi-Layer Debugging Pattern

```
1. Code Analysis (grep_search, find_by_name to understand current state)
2. UI Action (Playwright automation with screenshots)
3. Database Check (verify persistence and state changes)
4. Log Analysis (check server logs for errors/success)
5. API Testing (verify endpoints work correctly)
6. Integration Testing (test full workflows)
7. Evidence Collection (screenshots, logs, test results)
8. Refine Approach (improve based on findings)
9. Repeat (iterate until success with evidence)
```

## SPECIFIC SCRIPTS AND COMMANDS

### 1. Long-Running Server Management

**Start Server with Proper Timeout:**
```bash
# Use 1-hour timeout for server processes
npx tsx scripts/development/exec-with-timeout.ts --timeout 3600 -- npm run dev &
```

**Monitor Server Logs in Real-Time:**
```bash
# Real-time monitoring
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- tail -f server.log

# Historical log analysis
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- tail -100 server.log

# Look for errors in logs
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- grep error server.log
```

**Check Server Status:**
```bash
# Verify server is running on correct port
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- netstat -ano | findstr :<port>

# Test API endpoints
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- curl -s "http://localhost:<port>/<endpoint>"
```

### 2. Code Analysis and Understanding

**CRITICAL: Always Analyze Before Implementing**
Before making any changes, use tools to understand the current codebase:

```bash
# Find all files that import a specific module
grep_search --SearchPath src --Query "import.*GmailService" --IsRegex true --MatchPerLine true

# Find files by pattern
find_by_name --SearchDirectory src --Pattern "*email*" --Type file

# Read specific files to understand implementation
Read --file_path src/email/email-service.ts
```

**Pattern Analysis Requirements:**
1. **Examine existing patterns** in the codebase (e.g., CalendarService pattern)
2. **Use grep_search** to find all dependencies and usage
3. **Read actual implementations** to understand current architecture
4. **Document findings** with real code examples and line numbers

### 3. Playwright UI Automation with Visual Debugging

**IMPORTANT: Tool Troubleshooting Pattern**
When MCP Playwright tools fail with errors like `TypeError: (0 , import_server2.firstRootPath) is not a function`:

1. **Check for existing working Playwright tests** in the project
2. **Use direct Playwright library** instead of MCP tools
3. **Look for test files** like `test-dashboard-ui.ts`, `test-hitl-ui.ts` as templates
4. **Create custom test scripts** using the direct library approach

**Basic Playwright Script Template:**
```typescript
import { chromium } from 'playwright';

async function debugUIFlow() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 2000  // Human-like delays
  });
  
  try {
    const page = await browser.newPage();
    
    // Step 1: Navigate
    await page.goto(targetUrl);
    await page.waitForLoadState('networkidle');
    
    // Step 2: Take screenshot for debugging
    await page.screenshot({ path: 'debug-step-1.png' });
    console.log('📸 Screenshot saved: debug-step-1.png');
    
    // Step 3: Perform action
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    
    // Step 4: Take another screenshot
    await page.screenshot({ path: 'debug-step-2.png' });
    console.log('📸 Screenshot saved: debug-step-2.png');
    
    // Step 5-N: Iterate on above until scenario is fully validated
    
    
  } catch (error) {
    console.error('❌ UI flow failed:', error);
    await page.screenshot({ path: 'error-state.png' });
  } finally {
    await browser.close();
  }
}
```

**Advanced Playwright with Multiple Button Selectors:**
```typescript
// Look for multiple possible button selectors
const buttonSelectors = [
  'button:has-text("Continue")',
  'button:has-text("Allow")',
  'button:has-text("Accept")',
  'button:has-text("Authorize")',
  'button[type="submit"]',
  'button[jsname="LgbsSe"]:has-text("Continue")'
];

let buttonClicked = false;
for (const selector of buttonSelectors) {
  try {
    const button = await page.waitForSelector(selector, { timeout: 3000 });
    if (button && await button.isVisible()) {
      console.log(`🎯 Clicking button: ${selector}`);
      await button.click();
      buttonClicked = true;
      break;
    }
  } catch (e) {
    // Continue to next selector
  }
}
```

### 3. Database Validation Scripts

**MongoDB Token Validation:**
```typescript
const { DatabaseFactory } = require('./src/databases/database-factory');

async function checkDatabaseState() {
  console.log('🔍 Checking database state...');
  const dbService = await DatabaseFactory.createCalendarDatabaseService();
  await dbService.initialize();

  try {
    // Check for tokens
    const tokens = await dbService.loadCalendarTokens('primary');
    console.log('📋 Tokens found:', !!tokens);
    
    // Check for calendars
    const calendars = await dbService.getAllCalendars();
    console.log('📅 Calendars found:', calendars.length);
    
    // Check for specific data
    const credentials = await dbService.loadCredential('APP_CLIENT_ID');
    console.log('🔑 Credentials found:', !!credentials);
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await dbService.close();
  }
}
```

**API Endpoint Testing:**
```typescript
async function testAPIEndpoints() {
  const baseUrl = 'http://localhost:8333';
  
  // Test calendar API
  try {
    const response = await fetch(`${baseUrl}/calendar/events?timerange_start=2024-01-01T00:00:00.000Z&timerange_end=2024-01-02T00:00:00.000Z`);
    const data = await response.json();
    console.log('📅 Calendar API:', response.status, data);
  } catch (error) {
    console.error('❌ Calendar API failed:', error);
  }
  
  // Test conversation API
  try {
    const response = await fetch(`${baseUrl}/conversation/threads`);
    const data = await response.json();
    console.log('💬 Conversation API:', response.status, data);
  } catch (error) {
    console.error('❌ Conversation API failed:', error);
  }
}
```

### 4. OAuth Flow Debugging Scripts

**Complete OAuth Flow with Debugging:**
```typescript
async function debugOAuthFlow() {
  const browser = await chromium.launch({ headless: false, slowMo: 3000 });
  
  try {
    const page = await browser.newPage();
    const oauthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=...';
    
    // Step 1: Navigate and take screenshot
    await page.goto(oauthUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'oauth-step-1.png' });
    
    // Step 2: Email
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    await page.screenshot({ path: 'oauth-step-2.png' });
    
    // Step 3: Password
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', 'password');
    await page.click('button:has-text("Next")');
    await page.screenshot({ path: 'oauth-step-3.png' });
    
    // Step 4: Consent page
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'consent-page.png' });
    
    // Step 5: Click continue with multiple selectors
    const continueSelectors = [
      'button:has-text("Continue")',
      'button:has-text("Allow")',
      'button[type="submit"]'
    ];
    
    for (const selector of continueSelectors) {
      try {
        const button = await page.waitForSelector(selector, { timeout: 3000 });
        if (button && await button.isVisible()) {
          await button.click();
          break;
        }
      } catch (e) {}
    }
    
    // Step 6: Wait for callback
    await page.waitForURL('**/oauth/callback**', { timeout: 20000 });
    console.log('✅ OAuth flow completed!');
    
  } catch (error) {
    console.error('❌ OAuth flow failed:', error);
    await page.screenshot({ path: 'oauth-error.png' });
  } finally {
    await browser.close();
  }
}
```

### 5. Timeout Management Commands

**CRITICAL: Always Use Timeouts for Test Execution**
Following the established pattern from memory, ALWAYS use timeout commands to prevent hanging:

**Quick Operations (30s timeout):**
```bash
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- <command>
```

**Medium Operations (120s timeout):**
```bash
npx tsx scripts/development/exec-with-timeout.ts --timeout 120 -- <command>
```

**Always run tests with timeout**
```
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- npm run test <test-suite>
```

**Always examine test results after running tests**
```
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- cat test.log
```

## DEBUGGING WORKFLOW

### 1. **Initial Setup**
```bash
# Start server with long timeout
npx tsx scripts/development/exec-with-timeout.ts --timeout 3600 -- npm run dev &

# Wait for startup
sleep 3

# Check server logs
tail -20 server.log
```

### 2. **UI Automation with Visual Debugging**
```bash
# Run Playwright script with medium timeout
npx tsx scripts/development/exec-with-timeout.ts --timeout 120 -- npx tsx debug-ui-flow.ts
```

### 3. **Database Validation**
```bash
# Check database state
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- npx tsx check-database-state.ts
```

### 4. **API Testing**
```bash
# Test API endpoints
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- npx tsx test-api-endpoints.ts
```

### 5. **Log Analysis**
```bash
# Check recent logs
npx tsx scripts/development/exec-with-timeout.ts --timeout 30 -- tail -30 server.log
```

## COMMON PATTERNS

### Pattern 1: OAuth Flow Debugging
1. Start server with long timeout
2. Create Playwright script with screenshots
3. Run OAuth flow with visual debugging
4. Check database for token storage
5. Test API with stored tokens
6. Analyze logs for any errors

### Pattern 2: API Integration Debugging
1. Start server and verify it's running
2. Test API endpoints with curl
3. Check database for data persistence
4. Monitor server logs for errors
5. Fix issues and retest

### Pattern 3: UI Feature Debugging
1. Navigate to feature in browser
2. Take screenshots at each step
3. Perform actions and capture results
4. Check backend state changes
5. Verify end-to-end functionality

## ERROR DETECTION

### Server Log Errors to Watch For:
- `OAuth callback error:`
- `Database connection failed`
- `Missing credentials`
- `Port conflict errors`
- `TypeScript compilation errors`
- `API endpoint errors`

### Database State Validation:
- Check for expected data after operations
- Verify token storage and expiration
- Confirm calendar/thread creation
- Validate credential loading

### API Response Validation:
- Check HTTP status codes
- Verify response data structure
- Test error handling
- Confirm authentication

## SUCCESS INDICATORS

### OAuth Flow Success:
- Screenshots show successful page transitions
- Database contains valid tokens
- API calls return 200 OK with real data
- Server logs show successful token exchange

### API Integration Success:
- All endpoints return expected status codes
- Database contains persisted data
- No errors in server logs
- End-to-end functionality works

### UI Feature Success:
- Screenshots show correct UI state
- Actions produce expected results
- Backend state changes correctly
- No JavaScript errors in browser console

## CONCLUSION

These patterns provide a systematic approach to debugging complex integrations. The key is combining multiple validation layers (UI, API, Database) with appropriate timeout management and real-time monitoring. Always take screenshots, check database state, and monitor logs to get a complete picture of what's happening.