# AI Agent Guardrails

This file references the centralized rules located in `.ai-agents/rules/` to ensure consistency across all AI platforms.

## Referenced Rules

### 0. Integrity
**Source**: `.ai-agents/rules/integrity-and-test-ethics.md`

THIS IS THE MOST CRITICAL RULE. Be ethical, truthful, honest above all.

### 1. Simplicity
**Source**: `.ai-agents/rules/simplicity.md`

Keep solutions simple and focused, avoid over-engineering. Focus on the assigned issue only and don't make unrelated changes.

### 2. Communication  
**Source**: `.ai-agents/rules/communication.md`

Establish clear communication patterns and progress reporting standards for effective coordination between agents and stakeholders.

### 3. Architecture
**Source**: `.ai-agents/rules/architecture.md`

Maintain clean architectural boundaries by using BAML (LLM) for natural-language understanding and TypeScript for deterministic work.

### 4. Continuous Learning
**Source**: `.ai-agents/rules/continuous-learning.md`

Prevent repeating past mistakes by systematically learning from retrospectives, RFCs, and historical issue patterns.

### 5. Agent Testing Guidelines
**Source**: `.ai-agents/rules/agent-testing-guidelines.md`

Comprehensive testing and validation requirements with concrete evidence. Ensures all work is thoroughly validated before completion.

### 6. Local Development
**Source**: `.ai-agents/rules/local-development.md`

Local development guidelines and workspace safety. Enables safe parallel development through strict workspace separation.

### 7. Software Development Lifecycle
**Source**: `.ai-agents/rules/software-development-lifecycle.md`

### 8. PR Workflow Completeness
**Source**: `.ai-agents/rules/pr-workflow-completeness.md`

Ensure complete PR lifecycle handling with proper monitoring, feedback handling, and testing. Follow requirements for Git action monitoring, PR feedback polling, comment handling, test documentation, and bug fix workflow.

### 9. Merge Requirements
**Source**: `.ai-agents/rules/merge-requirements.md`

Enforces a strict `git rebase` workflow to ensure feature branches are up-to-date with `master` before merging, maintaining a clean and stable history.

### 10. Best practices while debuggin
**Source**: `.ai-agents/rules/successful-debugging-patterns.md`

Patterns on debugging issues systematically and converting learnings into test cases