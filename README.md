# 🚀 FRAIM: Framework for Rigor-based AI Management

**Where humans become AI managers through rigorous methodology**

FRAIM is a framework that empowers human developers to coordinate AI agents using **proven, tested practices** that have been refined through real project experience. This isn't theory - these are the actual rules that have been battle-tested in production environments.

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
├── test-config.json             # Example configuration
│
├── bin/                         # Command-line interface
│   └── fraim.js                 # FRAIM CLI with full functionality
│
├── agents/                      # AI agent configurations
│   ├── cursor/                  # Cursor IDE rules (TESTED)
│   │   ├── .cursorrules         # Main configuration
│   │   └── rules/               # Modular rule files
│   ├── claude/                  # Claude agent configuration (TESTED)
│   │   ├── CLAUDE.md            # Main configuration
│   │   └── rules/               # Modular rule files
│   └── windsurf/                # Windsurf agent configuration (TESTED)
│       ├── .windsurfrules       # Main configuration
│       └── rules/               # Modular rule files
│
├── workflows/                    # GitHub Actions workflows
│   └── setup-fraim.yml          # Automated FRAIM setup
│
├── scripts/                      # Python package scripts
│   ├── __init__.py              # Package initialization
│   ├── cli.py                   # Python CLI implementation
│   └── setup.py                 # Python setup module
│
├── docs/                         # Documentation and guides
│   ├── rfcs/                    # RFC documents
│   └── guides/                  # Getting started guides
│
└── examples/                     # Example implementations
    └── simple-webapp/            # Sample project with FRAIM config
        ├── README.md             # Project documentation
        └── fraim-config.json    # Sample configuration
```

## 🤖 Supported AI Agents

- **Cursor**: IDE-integrated development and testing (with tested rules)
- **Claude**: Conversational AI and design assistance (with tested rules)
- **Windsurf**: Advanced code understanding and optimization (with tested rules)

## 🔧 Core Features

- **Proven Rules**: Every rule has been tested in real projects
- **Automated Setup**: Single command to bootstrap FRAIM in any repository
- **GitHub Integration**: Native GitHub workflows, labels, and automation
- **Agent Coordination**: Seamless coordination between multiple AI agents
- **Phase Management**: Structured design → implementation → testing workflows
- **Enterprise Ready**: Observability, rollbacks, and audit trails built-in

## 📚 Documentation

- **Getting Started**: `/docs/guides/getting-started.md`
- **RFC Template**: `/docs/rfcs/`
- **Distribution Guide**: `DISTRIBUTION.md`
- **Agent Rules**: `/agents/` directory (all tested and proven)

## 🚀 Usage Examples

### Basic Setup
```bash
# Initialize FRAIM in current repository
npx fraim-framework init

# Learn about RIGOR methodology
npx fraim-framework rigor

# Interactive setup wizard
npx fraim-framework wizard
```

### Agent Coordination
```bash
# Create issue with phase labels
gh issue create --title "Add user auth" --label "phase:design,ai-agent:claude"

# AI agents automatically coordinate through GitHub state
# Claude creates RFC → Cursor implements → Windsurf optimizes
```

## 🎯 Success Metrics

- **Setup Time**: < 5 minutes from zero to production-ready
- **Agent Coordination**: Zero conflicts between multiple AI agents
- **Workflow Efficiency**: 50% reduction in development cycle time
- **Quality**: Built-in reviews and validation at every phase
- **Reliability**: Tested rules prevent common coordination failures

## 🔗 Quick Links

- **Repository**: [GitHub](https://github.com/mathursrus/Ashley-Calendar-AI/tree/master/FRAIM)
- **Issues**: [GitHub Issues](https://github.com/mathursrus/Ashley-Calendar-AI/issues)
- **Documentation**: [Framework Docs](https://github.com/mathursrus/Ashley-Calendar-AI/tree/master/FRAIM/docs)
- **Distribution**: [DISTRIBUTION.md](DISTRIBUTION.md)

## 🚀 Ready to Become an AI Manager?

FRAIM transforms the way you work with AI agents. Instead of managing code, you'll be managing AI teams with enterprise-grade discipline.

**Start your journey today:**
```bash
npx fraim-framework init
```

---

*FRAIM: Where humans become AI managers through rigorous methodology*

**Note**: All rules and workflows in FRAIM have been tested and proven in real project environments. This isn't theory - it's battle-tested practice.
