# 🚀 FRAIM Distribution Guide

**Framework for Rigor-based AI Management - Where humans become AI managers through rigorous methodology**

This guide covers all the ways to distribute and adopt the FRAIM framework.

P.S. I have only tested #1 so far

## 📦 Distribution Methods

### 1. **NPX (Recommended)**
```bash
npx @fraim/framework init
```

**Benefits:**
- Instant execution without installation
- Always uses latest version
- No global dependencies
- Cross-platform compatibility

**Package Details:**
- Name: `@fraim/framework`
- Scope: `@fraim`
- Registry: npmjs.com

### 2. **Python Package (pip)**
```bash
pip install fraim-framework
fraim init
```

**Benefits:**
- Python ecosystem integration
- Virtual environment support
- Easy dependency management
- Cross-platform compatibility

**Package Details:**
- Name: `fraim-framework`
- Registry: PyPI
- Python: >=3.8

### 3. **One-Line Installer**
```bash
curl -sSL https://fraim.dev/install.sh | bash -s -- --repo owner/repository
```

**Benefits:**
- No package manager required
- Works on any Unix-like system
- Direct GitHub integration
- Customizable installation

### 4. **GitHub Action**
```yaml
- uses: mathursrus/fraim-setup@v1
  with:
    repository: ${{ github.repository }}
    config: fraim-config.json
```

**Benefits:**
- Automated setup in CI/CD
- Repository integration
- Team collaboration
- Version control

## 🎯 Quick Start Snippets

### For New Repositories
```bash
# Create new repo and setup FRAIM
gh repo create my-ai-project --public
cd my-ai-project
npx @fraim/framework init
```

### For Existing Repositories
```bash
# Add FRAIM to existing project
cd existing-project
npx @fraim/framework init
```

## 🔧 Configuration Options

### Basic Setup
```json
{
  "repository": {
    "owner": "your-org",
    "name": "your-repo"
  },
  "features": {
    "labels": true,
    "workflows": true,
    "agentRules": ["cursor", "claude", "windsurf"]
  }
}
```

### Advanced Setup
```json
{
  "features": {
    "deployments": {
      "enabled": true,
      "environments": ["staging", "production"]
    },
    "notifications": {
      "slack": "webhook-url",
      "teams": "webhook-url"
    }
  },
  "phases": {
    "design": { "required_approvals": 2 },
    "implementation": { "required_approvals": 3 },
    "testing": { "auto_deploy": true }
  }
}
```

## 🚀 Launch Strategy

### Phase 1: Early Adopters
- **Target**: Individual developers and small teams
- **Distribution**: NPX and GitHub releases
- **Focus**: Core functionality and documentation

### Phase 2: Team Adoption
- **Target**: Development teams and organizations
- **Distribution**: Python package and GitHub Actions
- **Focus**: Team coordination and advanced features

### Phase 3: Enterprise
- **Target**: Large organizations and enterprises
- **Distribution**: Enterprise packages and support
- **Focus**: Compliance, security, and scalability

## 📊 Success Metrics

### Adoption Metrics
- **Downloads**: NPX executions, pip installs
- **Repositories**: GitHub stars, forks, usage
- **Community**: Issues, PRs, discussions

### Usage Metrics
- **Active Users**: Monthly active repositories
- **Feature Usage**: Workflow executions, label usage
- **Retention**: Repeat usage, long-term adoption

### Quality Metrics
- **Satisfaction**: User ratings, feedback scores
- **Support**: Issue resolution time, documentation quality
- **Performance**: Setup time, workflow success rates

## 🔗 Distribution URLs

### Primary
- **NPX**: `npx @fraim/framework`
- **Python**: `pip install fraim-framework`
- **GitHub**: `https://github.com/mathursrus/FRAIM`

### Documentation
- **Main Docs**: `https://fraim.dev`
- **GitHub Wiki**: `https://github.com/mathursrus/FRAIM/wiki`
- **Examples**: `https://github.com/mathursrus/FRAIM/tree/master/examples`

### Support
- **Issues**: `https://github.com/mathursrus/FRAIM/issues`
- **Discussions**: `https://github.com/mathursrus/FRAIM/discussions`
- **Community**: `https://github.com/mathursrus/FRAIM/community`

## 🎯 Next Steps

1. **Choose Distribution Method**: Select the best option for your use case
2. **Setup FRAIM**: Follow the [quick start guide](docs/guides/getting-started.md)
3. **Configure Agents**: Customize AI agent rules and workflows
4. **Start Managing**: Begin coordinating AI agents with RIGOR methodology
5. **Share Feedback**: Contribute to the community and framework improvement

---

**Ready to become an AI manager?** 🚀

Start your FRAIM journey today with any of the distribution methods above!
