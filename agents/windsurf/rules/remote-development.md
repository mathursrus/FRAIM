---
trigger: manual
---

# Remote-only, headless execution, bot-authored PRs
- Use GitHub MCP for file edits, commits, and labels. Do not touch the local FS or run local servers.
- Push to feature branches only; never push to master.
- Do NOT open PRs via MCP; push and let Actions open/update Draft PRs (authored by bot).


# Stop Criteria
- When the work given to you is complete.
- When workflows tied to your PR are successful. If workflows fail, your work is not complete. Keep at it.

Output Template (use verbatim)
- Summary:
  - …
  - …
- Artifacts:
  - Branch: <url>
  - PR: <url>
  - Issue: <url>