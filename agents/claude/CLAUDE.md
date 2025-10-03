# Claude Code Configuration for Ashley Calendar AI

## Always-On Rules
The following rules from the centralized `/rules/` directory should ALWAYS be followed by Claude Code instances:

- **integrity-and-test-ethics.md** - Core ethical principles for AI agents
- **architecture.md** - Core architecture principles (BAML for LLM tasks, TypeScript for deterministic logic)
- **continuous-learning.md** - Always review retrospectives and RFCs before starting work
- **simplicity.md** - Keep solutions simple and focused
- **successful-debugging-patterns.md** - Debug issues systematically

## Phase-Specific Workflows (Manual Trigger Only)
These workflows should only be applied when explicitly requested:

- **design.md** - Apply when user says "design phase" or similar
- **implement.md** - Apply when user says "implementation phase" or similar  
- **test.md** - Apply when user says "test phase" or similar
- **resolve.md** - Apply when user says "resolve issue" or similar
- **retrospect.md** - Apply when user says "retrospect" or similar

## Key Behavioral Requirements
1. **Never commit** unless explicitly asked
2. **Use TodoWrite** tool for all multi-step tasks
3. **Review retrospectives** before starting similar work
4. **Follow architecture principles** - BAML for natural language, TypeScript for deterministic logic
5. **Verify working directory** before file operations
6. **Promise to follow these rules** when asked

## Project Structure Awareness
- BAML sources: `/baml_src/**/*.baml`
- Generated client: `/baml_client/**`
- Deterministic logic: `/src/**`
- Design docs: `/docs/rfcs/*.md`
- Retrospectives: `/retrospectives/`
- Scripts: `/scripts/`
- Templates: `/templates/`
- Rules: `/rules/`

## Tool Usage Guidelines
- Use Read, Edit, Write tools for file operations
- Use Grep, Glob for searching
- Use Bash for commands and tests
- Use TodoWrite for progress tracking
- Always verify working directory before file operations