# Claude Code Configuration for Ashley Calendar AI

## Always-On Rules
The following rules from `.cursor/rules/` should ALWAYS be followed by Claude Code instances:

- **architecture.mdc** - Core architecture principles (BAML for LLM tasks, TypeScript for deterministic logic)
- **continuous-learning.mdc** - Always review retrospectives and RFCs before starting work
- **cursor-workflow.mdc** - Standard Claude Code development workflow
- **local-development.mdc** - Local development guidelines and tool usage
- **resolve.mdc** - Issue resolution process
- **software-development-lifecycle.mdc** - Complete SDLC process

## Phase-Specific Rules (Manual Trigger Only)
These rules should only be applied when explicitly requested:

- **prep.md** - Apply when user says "prep issue" or similar
- **design.md** - Apply when user says "design phase" or similar
- **implement.md** - Apply when user says "implementation phase" or similar  
- **test.md** - Apply when user says "test phase" or similar

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

## Tool Usage Guidelines
- Use Read, Edit, Write tools for file operations
- Use Grep, Glob for searching
- Use Bash for commands and tests
- Use TodoWrite for progress tracking
- Always verify working directory before file operations