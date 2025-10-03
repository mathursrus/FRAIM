# FRAIM Scripts

This directory contains scripts for automating various tasks in the FRAIM framework.

## Python Scripts
These scripts are part of the FRAIM Python package:

- `__init__.py` - Package initialization
- `cli.py` - Python CLI implementation

## Shell Scripts
These scripts provide automation for repository management and CI/CD processes:

- `ensure-tests-present.sh` - Validates that implementation files have corresponding test files
- `exec-with-timeout.sh` - Executes a command with a timeout
- `prep-issue.sh` - Prepares a GitHub issue for AI agent work

## Usage

### Python Scripts
These are used when FRAIM is installed as a Python package:

```bash
# Install FRAIM
pip install fraim-framework

# Use the CLI
fraim init
```

### Shell Scripts
These can be executed directly from the repository:

```bash
# Prepare an issue for AI agent work
./scripts/prep-issue.sh 123 owner/repo

# Run a command with timeout
./scripts/exec-with-timeout.sh 60 npm test

# Check if PR has tests
./scripts/ensure-tests-present.sh 45 owner/repo
```

These shell scripts are also used by GitHub Actions workflows for automation.