# FRAIM Update Implementation Plan

This document outlines the plan for updating the FRAIM repository to incorporate the improved agent management patterns from Ashley Calendar AI.

## Components to Keep

### Installation and Packaging
- `package.json` - Node.js package configuration
- `setup.js` - Cross-platform setup script
- `install.sh` - One-line bash installer
- `index.js` - Main entry point
- `bin/fraim.js` - CLI implementation

### Python Package Components
- `scripts/__init__.py` - Python package initialization
- `scripts/cli.py` - Python CLI implementation
- `setup.py` - Python package configuration

## Components to Replace or Remove

### Old Rules
- References to `.cursor/rules/` in `agents/claude/CLAUDE.md` - Replace with centralized `/rules/` directory

### Old Workflows
- Keep `workflows/setup-fraim.yml` for GitHub Actions automation
- Add new workflow templates in Markdown format

## New Components to Add

### Centralized Rules
- `/rules/` directory with standardized rule files
  - `integrity-and-test-ethics.md`
  - `simplicity.md`
  - `architecture.md`
  - `continuous-learning.md`
  - `successful-debugging-patterns.md`

### Workflow Templates
- `/workflows/` directory with workflow templates
  - `design.md`
  - `implement.md`
  - `test.md`
  - `resolve.md`
  - `retrospect.md`

### Templates
- `/templates/` directory with standardized templates
  - `/templates/evidence/evidence-template.md`
  - `/templates/retrospective/retro-template.md`
  - `/templates/specs/rfc-template.md`
  - `/templates/help/help-template.md`

### GitHub Configuration
- `.github/workflows/` directory with GitHub Actions workflows
  - `phase-change.yml`
  - `ci.yml`
- `.github/pull_request_template.md`
- `CODEOWNERS`

### Scripts
- Add new shell scripts to the existing `scripts` directory
  - `ensure-tests-present.sh`
  - `exec-with-timeout.sh`
  - `prep-issue.sh`

### Configuration
- `mcp-template.jsonc`
- `labels.json`

## Integration Approach

1. Keep all installation and packaging components untouched
2. Update agent configuration to reference the new centralized rules
3. Add clarifying documentation to explain the relationship between different components
4. Ensure new scripts coexist with existing Python scripts in the scripts directory
5. Update README.md to reflect the new structure and capabilities