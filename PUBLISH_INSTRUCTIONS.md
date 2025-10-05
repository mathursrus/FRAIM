# Publishing FRAIM v2 to npm

## Prerequisites
1. **npm account**: You need an npm account to publish packages
2. **npm CLI**: Make sure you have npm installed and updated

## Step 1: Login to npm
```bash
npm login
```
Enter your npm username, password, and email when prompted.

## Step 2: Verify Login
```bash
npm whoami
```
Should display your npm username.

## Step 3: Test the Package (Optional but Recommended)
```bash
# Test the package locally
npm pack
# This creates a .tgz file you can inspect

# Test installation locally
npm install -g ./fraim-framework-2.0.0.tgz
fraim --help
```

## Step 4: Publish to npm
```bash
npm publish
```

## Step 5: Verify Publication
```bash
# Check the package on npm
npm view fraim-framework

# Test installation from npm
npm install -g fraim-framework@2.0.0
fraim --help
```

## What's Included in v2.0.0

### 🚀 Major Features
- **Complete Generic Framework**: No Ashley-specific IP
- **13 Comprehensive Rule Files**: Full AI agent management
- **Simplified Label System**: 9 essential labels
- **Spec Workflow**: Requirements and UX definition
- **Timeout Management**: Advanced script execution with visibility
- **Evidence-Based Validation**: Mandatory test evidence
- **Systematic Debugging**: Structured debugging patterns

### 📦 Package Contents
- `bin/fraim.js` - Main CLI executable
- `index.js` - Main entry point
- `setup.js` - Setup script for new projects
- `package.json` - Package configuration (v2.0.0)
- `.ai-agents/` - Complete rule system
- `examples/` - Example test cases with documentation
- `CHANGELOG.md` - Detailed changelog
- `README.md` - Marketing-style documentation

### 🎯 Installation
```bash
npm install -g fraim-framework
fraim init
```

## Post-Publication Tasks

1. **Update README**: Ensure all installation instructions use the new v2 commands
2. **GitHub Release**: Create a GitHub release for v2.0.0
3. **Documentation**: Update any external documentation
4. **Social Media**: Share the LinkedIn post about v2

## Rollback Plan (if needed)
```bash
# If you need to unpublish (only works within 24 hours)
npm unpublish fraim-framework@2.0.0

# Or deprecate the version
npm deprecate fraim-framework@2.0.0 "Use latest version instead"
```

## Success Metrics
- Package successfully published to npm
- Installation works: `npm install -g fraim-framework`
- CLI works: `fraim --help`
- Setup works: `fraim init`
- All examples and documentation updated
