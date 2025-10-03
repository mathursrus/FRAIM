# Git Safe Commands Rule

## Problem
Some Git commands (`git log`, `git diff`, `git branch`, `git commit`) open an interactive pager or editor, which causes Windsurf agents to hang.

## Rule
Agents **must not** run Git commands that may open interactive prompts or pagers **without non-interactive flags**.

### Disallowed (will hang)
- `git log`
- `git diff`
- `git branch`
- `git commit`

### Allowed (safe variants)
- `git log --oneline --no-pager`
- `git diff --no-pager`
- `git branch --no-color`
- `git commit -m "message"`

## Enforcement
If an agent attempts to run one of the disallowed forms, **reject the command** and suggest the safe variant instead.

## Examples
❌ `git log` → hangs  
✅ `git log --oneline --no-pager` → safe  

❌ `git diff` → hangs  
✅ `git diff --no-pager` → safe  

❌ `git commit` → opens editor  
✅ `git commit -m "Fix issue #123"` → safe  

---