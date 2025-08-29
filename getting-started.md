# 🚀 Getting Started with FRAIM

**Framework for Rigor-based AI Management**

Welcome to FRAIM! This guide will transform you from a developer into an AI manager in under 30 seconds.

## 🎯 What is FRAIM?

FRAIM is a framework that empowers human developers to coordinate AI agents using the  **RIGOR methodology**: Reviews • Isolation • GitOps • Observability • Retrospectives.

Instead of manually managing AI tools, FRAIM gives you the structure and automation to orchestrate AI agents like a professional team manager.

## 🚀 Quick Start (30 seconds)

### 1. Navigate to Your Repository
```bash
cd your-project
```

### 2. Setup FRAIM
```bash
npx @fraim/setup init
```

### 3. Create Your Issue List in your Git Repo
```bash
gh issue create --title "Add user authentication" 
```

### 4. Let your AI Agents do the Magic! 🎉
Cursor: @design 1
Windsurf: /start-design 1
Claude: @design 1

AI Agent automatically:
- 🔄 Labels the Git issue with phase:design

GitHub automatically:
- 🔄 Creates branch: `feature/1-add-user-authentication`
- 🔄 Creates draft PR
- 🔄 Sets status: `status:wip`

AI Agent automatically:
- 🔄 Checks out the new branch
- 🔄 Researches codebase, architecture, issue and writes a PRD/RFC
- 🔄 Commits, Syncs the branch and Labels the Git issue with status:needs-review for you to PR

You:
- Watch the magic happen
- Review the PR like you normally would, and add comments
- Let the AI Agent know if you want it to iterate, or proceed to @implement (Claude, Cursor), or /start-impl (Windsurf)


## 🧠 Understanding the RIGOR Methodology

FRAIM is built on five core principles that ensure reliable, scalable, continuously improving AI coordination:

- **R**eviews: Structured feedback and approval processes
- **I**solation: Agents don't interfere with each others' work *unless* you explicitly ask them to
- **G**itOps: Git as the single source of truth and the glue between you and your agents
- **O**bservability: Complete visibility into AI activities
- **R**etrospectives: Continuous learning from mistakes and positive experiences


## 📋 Workflow Phases

### Phase 1: Design (`phase:design`)
1. **You**: Tell the agent to move into this phase and give it the issue number
2. **AI Action**: Labels issue `phase:design`, moves to branch, creates RFC/UX/test-plan, commits and sends out PR, labels issue `status:needs-review`
3. **Review**: Stakeholders review and approve design
4. **Issue, PR State**: Git automatically changes status between wip, complete

### Phase 2: Implementation (`phase:impl`)
1. **You**: Tell the agent to move into this phase
2. **AI Action**: Labels issue `phase:impl`, moves to branch, consults issue/code/rfcs, implements code and tests, runs tests, commits and sends out PR
3. **Review**: Stakeholders review and approve implementation
4. **Issue, PR State**: Git automatically changes status between wip, complete

### Phase 3: Resolve 
1. **You**: Tell the agent to move into this phase once totally satisfied with the implementation and tests
2. **AI Action**: Pulls from master, deals with merge issues (with your help if needed), confirms everything still works, pushes to master, deletes remote and local branches, cleans up local copy of the branch
3. **Git**: Runs CI and prevents merging if failed

## 🏷️ Label System

### Phase Labels
- `phase:design` - Design and RFC creation
- `phase:impl` - Implementation and development
- `phase:tests` - Testing and validation (if needed, I ask AI Agents to write tests as part of implementation)

### Status Labels
- `status:wip` - Work in progress
- `status:needs-review` - Ready for review
- `status:complete` - Work completed

### Agent Labels (for future, I don't use these yet)
- `ai-agent:cursor` - Assigned to Cursor
- `ai-agent:claude` - Assigned to Claude
- `ai-agent:windsurf` - Assigned to Windsurf

## 🔧 Advanced Setup

### Interactive Wizard
```bash
npx @fraim/setup wizard
```

The wizard will ask you:
- Which AI agents to enable
- Whether to enable deployment workflows
- Whether to run in dry-run mode first

### Custom Configuration
```bash
npx @fraim/setup setup owner/repository --config custom-config.json
```

### Partial Setup
```bash
# Only create labels
npx @fraim/setup setup owner/repository --labels-only

# Only setup workflows
npx @fraim/setup setup owner/repository --workflows-only
```

## 🎯 Success Metrics - I hope these happen for you

- **Setup Time**: < 30 seconds to get started
- **Issue Resolution**: Faster development cycles
- **Code Quality**: Higher quality through AI coordination
- **Learning**: Better understanding of AI capabilities

## 🚀 Ready to Become an AI Manager?

```bash
npx @fraim/setup init
```

**FRAIM: Where humans become AI managers through rigorous methodology**

---

