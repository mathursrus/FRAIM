# FRAIM Workflows

This directory contains two types of workflow files:

## GitHub Action Workflows (YAML)
Files with `.yml` extension are GitHub Actions workflow definitions:

- `setup-fraim.yml` - Automated FRAIM setup workflow for GitHub Actions

## Workflow Templates (Markdown)
Files with `.md` extension are workflow templates that define processes for AI agents:

- `design.md` - Design phase workflow
- `implement.md` - Implementation phase workflow
- `test.md` - Testing phase workflow
- `resolve.md` - Issue resolution workflow
- `retrospect.md` - Retrospective workflow

## Usage

### GitHub Action Workflows
These are automatically executed by GitHub when triggered by events defined in the workflow file.

### Workflow Templates
These are referenced by AI agents when they need to follow a specific process. The agent will read the workflow template and follow the steps defined in it.

For example, when an issue is labeled with `status:ready-for-design`, the phase-change GitHub Action will comment on the issue with instructions to follow the design workflow, referencing `workflows/design.md`.