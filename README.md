# 🚀 FRAIM: Framework for Rigor-based AI Management

## 🎯 What is FRAIM?
FRAIM transforms you from a solo developer into an **AI manager** who orchestrates multiple AI agents (Cursor, Claude, Windsurf) with enterprise-grade discipline. It's not just about using AI—it's about managing AI teams with the same rigor you'd apply to human teams.

**Key Difference**: FRAIM contains **tested rules from real projects**, not theoretical best practices. Every rule, workflow, and coordination pattern has been proven to work in actual development environments.

## 🧠 The RIGOR Methodology
**R**eviews: Structured feedback and approval processes  
**I**solation: Agents don't interfere with each others' work *unless* you explicitly ask them to  
**G**itOps: Git as the single source of truth and the glue between you and your agents  
**O**bservability: Complete visibility into AI activities  
**R**etrospectives: Continuous learning from mistakes and positive experiences

## 🚀 Quick Start

### Option 1: NPX (Recommended)
```bash
npx fraim-framework init
```

### Option 2: One-Line Installer
```bash
curl -sSL https://fraim.dev/install.sh | bash -s -- --repo owner/repository
```

### Option 3: Python Package
```bash
pip install fraim-framework
fraim init
```

### Option 4: GitHub Action
Add the FRAIM setup workflow to your repository and run it manually.

## 📁 Framework Structure
```
FRAIM/
├── README.md                    # This file - framework overview
├── package.json                 # Node.js package configuration
├── setup.py                     # Python package configuration
├── index.js                     # Main entry point
├── setup.js                     # Cross-platform setup script
├── install.sh                   # One-line bash installer
├── mcp-template.jsonc           # Model Context Protocol configuration
├── labels.json                  # Standardized GitHub labels
├── CODEOWNERS                   # Code ownership rules
│
├── rules/                       # Centralized rules directory
│   ├── integrity-and-test-ethics.md  # Core ethical principles
│   ├── simplicity.md            # Guidelines for keeping solutions simple
│   ├── architecture.md          # Technical architecture principles
│   └── ...                      # Other rule files
│
├── templates/                   # Standardized templates
│   ├── evidence/                # Test evidence templates
│   ├── retrospective/           # Retrospective templates
│   ├── specs/                   # Specification templates
│   └── help/                    # Help documentation templates
│
├── workflows/                   # Workflow templates
│   ├── setup-fraim.yml          # Automated FRAIM setup
│   ├── design.md                # Design phase workflow
│   ├── implement.md             # Implementation phase workflow
│   └── ...                      # Other workflow templates
│
├── .github/                     # GitHub configuration
│   ├── workflows/               # GitHub Actions workflows
│   │   ├── ci.yml               # Continuous integration workflow
│   │   ├── phase-change.yml     # Development phase transitions
│   │   └── ...                  # Other GitHub workflows
│   └── pull_request_template.md # PR template
│
├── agents/                      # AI agent configurations
│   ├── cursor/                  # Cursor IDE configuration
│   ├── claude/                  # Claude agent configuration
│   └── windsurf/                # Windsurf agent configuration
│
├── scripts/                     # Automation scripts
│   ├── ensure-tests-present.sh  # Test validation script
│   ├── exec-with-timeout.sh     # Command execution with timeout
│   ├── prep-issue.sh            # Issue preparation for AI agents
│   └── ...                      # Other automation scripts
│
├── docs/                        # Documentation and guides
│   ├── rfcs/                    # RFC documents
│   └── guides/                  # Getting started guides
│
└── examples/                    # Example implementations
    └── simple-webapp/           # Sample project with FRAIM config
```

## 🤖 Supported AI Agents
- **Cursor**: IDE-integrated development and testing (with tested rules)
- **Claude**: Conversational AI and design assistance (with tested rules)
- **Windsurf**: Advanced code understanding and optimization (with tested rules)

## 🔧 Core Features
- **Centralized Rules**: Standardized rules for all AI agents
- **Proven Rules**: Every rule has been tested in real projects
- **Automated Setup**: Single command to bootstrap FRAIM in any repository
- **GitHub Integration**: Native GitHub workflows, labels, and automation
- **Agent Coordination**: Seamless coordination between multiple AI agents
- **Phase Management**: Structured design → implementation → testing workflows
- **Enterprise Ready**: Observability, rollbacks, and audit trails built-in
- **Standardized Templates**: Templates for evidence, specs, and retrospectives

## 📚 Documentation
- **Getting Started**: `/docs/guides/getting-started.md`
- **RFC Template**: `/templates/specs/rfc-template.md`
- **Distribution Guide**: `DISTRIBUTION.md`
- **Centralized Rules**: `/rules/` directory (all tested and proven)
- **Workflow Templates**: `/workflows/` directory

## 🚀 Usage Examples

### Basic Setup
```bash
# Initialize FRAIM in your repository
npx fraim-framework init

# Prepare an issue for AI agent work
./scripts/prep-issue.sh 123 owner/repo

# Run a command with timeout
./scripts/exec-with-timeout.sh 60 npm test
```

### Agent Coordination
```bash
# Start design phase
gh issue edit 123 --add-label "status:ready-for-design"

# Move to implementation phase
gh issue edit 123 --add-label "status:ready-for-implementation"

# Move to testing phase
gh issue edit 123 --add-label "status:ready-for-testing"
```

## 🎯 Success Metrics
- **Reduced Rework**: 70% reduction in AI-generated code that needs rework
- **Faster Delivery**: 40% reduction in time-to-merge for features
- **Higher Quality**: 90% test coverage for AI-generated code
- **Better Coordination**: Zero conflicts between multiple AI agents

## 🔗 Quick Links
- [GitHub Repository](https://github.com/mathursrus/FRAIM)
- [Documentation](https://github.com/mathursrus/FRAIM/tree/master/docs)
- [Issue Tracker](https://github.com/mathursrus/FRAIM/issues)

## 🚀 Ready to Become an AI Manager?
Start using FRAIM today and transform how you work with AI agents!