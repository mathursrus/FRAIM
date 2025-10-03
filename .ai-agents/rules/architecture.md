# Architecture

## INTENT
To maintain clean architectural boundaries by using appropriate technologies for each task, ensuring optimal performance and maintainability.

## PRINCIPLES
- **Separation of Concerns**: Keep different parts of the system focused on their specific responsibilities
- **Performance First**: Use deterministic code for predictable operations
- **Maintainability**: Clear boundaries between components
- **Consistency**: Follow established patterns
- **Testability**: Keep logic easily testable

## ARCHITECTURAL PIPELINE
1. **Parse** → 2. **Normalize** → 3. **Validate** → 4. **Decide** → 5. **Act**

## Do / Don't

### Do
- Extract meaningful information from user inputs
- Classify user intent and preferences
- Compare similar items for equivalence or differences
- Convert parsed data to standard formats
- Enforce schemas and reject malformed inputs
- Handle external communications and data storage
- Understand the way the codebase is structured

### Don't
- Don't hand-roll complex parsing logic when better tools exist
- Don't duplicate functionality
- Don't use complex tools for simple operations

## Project Structure
- **Rules**: `/.ai-agents/rules/**/*.md`
- **Workflows**: `/workflows/**/*.md`
- **Templates**: `/templates/**/*.md`
- **Scripts**: `/scripts/**/*.sh`
- **GitHub Configuration**: `/.github/**/*`

## EXAMPLES

### Good: Proper Architecture Usage
```typescript
// ✅ Appropriate tool for understanding
const intent = extractIntent(userMessage);

// ✅ Deterministic for processing
const normalizedData = convertToStandardFormat(parsedData);
const validationResult = validateData(normalizedData);

// ✅ Appropriate tool for decision making
const decision = decideNextAction(validationResult, preferences);

// ✅ Deterministic for execution
executeAction(decision);
```

### Bad: Architecture Violations
```typescript
// ❌ Using complex tools for simple operations
const formatted = useComplexParserForSimpleFormat(date);

// ❌ Using inappropriate tools for complex understanding
const intent = parseWithRegex(complexUserMessage);

// ❌ Mixing concerns in single function
async function handleEverything() {
  const intent = extractIntent();
  const normalized = normalize();
  const decision = decide();
  await execute();
  // Should be split into pipeline steps
}
```

## Local Development Notes
- Test deterministic logic with unit tests before integrating with other components
- Keep architecture boundaries clear between different system components
- Document any architectural decisions in your RFC or implementation notes