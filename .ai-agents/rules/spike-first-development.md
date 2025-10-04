# Spike-First Development Pattern

## INTENT
Prevent the "Build First, Integrate Later" anti-pattern that leads to wasted work, technical debt, and incomplete implementations. Ensure agents validate technology compatibility and requirements understanding before building complex solutions.

## CORE PRINCIPLE
**"Validate Early, Validate Often"** - Always prove that your approach works with the smallest possible test before building anything complex.

## THE ANTI-PATTERN: "Build First, Integrate Later" ❌

### What It Looks Like
1. **Build Infrastructure First**: Create complex modular systems, frameworks, or architectures
2. **Assume Technology Support**: Assume unfamiliar technologies will support your approach
3. **Attempt Integration**: Discover incompatibilities or limitations late in the process
4. **Panic Implementation**: Rush to salvage work, often missing original requirements

### Why It's Dangerous
- **Wasted Work**: Build incompatible solutions that must be thrown away
- **Rushed Integration**: Leads to incomplete implementations and missed requirements  
- **Technical Debt**: Creates bloat and confusion in the codebase
- **False Progress**: Appears productive while actually going backwards
- **Missed Requirements**: Focus on infrastructure instead of actual goals

## THE CORRECT PATTERN: "Spike, Analyze, Implement Incrementally" ✅

### 1. SPIKE/PROOF-OF-CONCEPT FIRST (5-15 minutes)
**Goal**: Validate the basic technology works with minimal effort

**Examples**:
- Testing Jinja in BAML: Add `{% if true %}Hello{% endif %}` to a prompt
- Testing API integration: Make one simple API call
- Testing database connection: Execute one basic query
- Testing new library: Import and call one function

**Questions to Answer**:
- Does the technology support what I need?
- What are the syntax requirements?
- What are the limitations?
- Does it integrate with existing systems?

### 2. ANALYZE DATA STRUCTURES (10-20 minutes)
**Goal**: Understand what data is available for your implementation

**Examples**:
- Examine input/output classes and their fields
- Review existing data flows and transformations
- Identify what fields are available for conditional logic
- Map data relationships and dependencies

**Questions to Answer**:
- What fields can I use for conditionals?
- What data is available at runtime?
- How does data flow through the system?
- What are the data constraints?

### 3. IDENTIFY OPPORTUNITIES (15-30 minutes)
**Goal**: Map requirements to implementation opportunities

**Examples**:
- Identify large code sections that should be conditional
- Find repetitive patterns that can be optimized
- Locate areas where data-driven logic would help
- Spot opportunities for code reduction or simplification

**Questions to Answer**:
- Where should conditional logic be applied?
- What sections are candidates for optimization?
- How can I reduce complexity or bloat?
- What are the highest-impact changes?

### 4. IMPLEMENT INCREMENTALLY (Variable time)
**Goal**: Build one small piece at a time with continuous validation

**Process**:
- Add ONE conditional/feature at a time
- Test after each change
- Ensure existing functionality is preserved
- Validate requirements are being met
- Only proceed to next change after current one works

**Examples**:
- Add one `{% if %}` conditional, test, then add next
- Implement one API endpoint, test, then add next
- Add one database operation, test, then add next

### 5. VALIDATE CONTINUOUSLY (Throughout)
**Goal**: Ensure each step works before proceeding

**Validation Steps**:
- Run tests after each change
- Verify compilation/generation works
- Check that existing functionality is preserved
- Confirm requirements are being addressed
- Get feedback early and often

## GOOD vs BAD EXAMPLES

### ❌ BAD: Jinja Templating Implementation
```
1. Create 15 modular Jinja template files
2. Build complex include system
3. Assume BAML supports {% include %}
4. Discover BAML doesn't support includes
5. Panic and rush minimal implementation
6. Miss obvious conditional opportunities
7. Break existing functionality
```

### ✅ GOOD: Jinja Templating Implementation
```
1. SPIKE: Test {% if true %}Hello{% endif %} in BAML (5 min)
2. ANALYZE: Examine UserIntent/UserInfo classes (10 min)
3. IDENTIFY: Map prompt sections to conditional opportunities (15 min)
4. IMPLEMENT: Add {% if user.role == "admin" %} around admin logic (20 min)
5. VALIDATE: Run tests, ensure functionality preserved (10 min)
6. REPEAT: Add next conditional incrementally
```

### ❌ BAD: API Integration
```
1. Build complex API client framework
2. Create elaborate error handling system
3. Design sophisticated caching layer
4. Discover API has rate limits that break the design
5. Rush to add rate limiting as afterthought
6. End up with over-engineered, fragile system
```

### ✅ GOOD: API Integration
```
1. SPIKE: Make one simple API call (5 min)
2. ANALYZE: Read API documentation for limits/constraints (15 min)
3. IDENTIFY: Determine what endpoints are needed (10 min)
4. IMPLEMENT: Add one endpoint call with basic error handling (30 min)
5. VALIDATE: Test the call works reliably (10 min)
6. REPEAT: Add next endpoint incrementally
```

### ❌ BAD: Database Schema Changes
```
1. Design complete new schema
2. Write migration scripts for all tables
3. Update all model classes
4. Discover performance issues with new design
5. Rush to add indexes and optimize queries
6. Break existing functionality in multiple places
```

### ✅ GOOD: Database Schema Changes
```
1. SPIKE: Test schema change on one small table (10 min)
2. ANALYZE: Review existing queries and performance (20 min)
3. IDENTIFY: Plan migration strategy and rollback plan (15 min)
4. IMPLEMENT: Change one table with migration (45 min)
5. VALIDATE: Test performance and functionality (15 min)
6. REPEAT: Migrate next table incrementally
```

## ENFORCEMENT RULES

### MANDATORY SPIKE REQUIREMENTS
- **Any unfamiliar technology**: Must spike basic functionality first
- **Any complex integration**: Must test simplest case first
- **Any architectural changes**: Must validate approach with minimal example
- **Any new libraries/frameworks**: Must test basic usage first

### VALIDATION CHECKPOINTS
- After spike: Technology compatibility confirmed
- After analysis: Data structures and constraints understood
- After identification: Implementation plan is clear and achievable
- After each increment: Functionality works and tests pass
- Before completion: All requirements met and validated

### RED FLAGS (Stop and Spike)
- Building complex systems without testing basic functionality
- Making assumptions about unfamiliar technology capabilities
- Creating elaborate architectures before validating core concepts
- Spending significant time on infrastructure before proving it works
- Claiming progress without demonstrable working functionality

## BENEFITS OF SPIKE-FIRST DEVELOPMENT

1. **Reduced Risk**: Discover incompatibilities early when they're cheap to fix
2. **Faster Delivery**: Avoid wasted work on incompatible approaches
3. **Better Quality**: Continuous validation ensures functionality is preserved
4. **Clearer Requirements**: Understanding constraints leads to better solutions
5. **Increased Confidence**: Each step is validated before proceeding
6. **Easier Debugging**: Problems are isolated to small, recent changes

## SUMMARY

The spike-first development pattern prevents catastrophic failures by ensuring agents:
- Validate technology compatibility before building
- Understand data structures and constraints upfront
- Implement incrementally with continuous validation
- Focus on requirements rather than infrastructure
- Avoid the dangerous "Build First, Integrate Later" anti-pattern

**Remember**: It's always faster to spike first than to rebuild later.