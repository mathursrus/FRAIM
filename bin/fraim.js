#!/usr/bin/env node

// Simple banner without external dependencies
const banner = `
╔══════════════════════════════════════════════════════════════╗
║  🚀 FRAIM                                                  ║
║  Framework for Rigor-based AI Management                    ║
║  Where humans become AI managers                            ║
╚══════════════════════════════════════════════════════════════╝
`;

function showHelp() {
    console.log(banner);
    console.log('🤖 Welcome to FRAIM!');
    console.log('Where humans become AI managers through rigorous methodology\n');
    console.log('✨ All rules and workflows have been tested in real projects!\n');

    console.log('🚀 Quick commands:');
    console.log('  npx fraim-framework init     # Setup current repository');
    console.log('  npx fraim-framework wizard   # Interactive setup');
    console.log('  npx fraim-framework --help   # Full documentation');
    console.log('  fraim rigor                   # Learn RIGOR methodology\n');

    console.log('🧠 The RIGOR Methodology (Tested & Proven):');
    console.log('  R - Reviews: Structured feedback and approval processes');
    console.log('  I - Isolation: Agents don\'t interfere unless explicitly asked');
    console.log('  G - GitOps: Git as the single source of truth and coordination glue');
    console.log('  O - Observability: Complete visibility into AI activities');
    console.log('  R - Retrospectives: Continuous learning from experience\n');

    console.log('📚 Documentation: https://github.com/mathursrus/FRAIM');
    console.log('🎯 Ready to become an AI manager? Run: npx fraim-framework init');
}

function showRigor() {
    console.log(banner);
    console.log('🧠 The RIGOR Methodology for AI Management (Tested & Proven)\n');

    console.log('R - Reviews:');
    console.log('  • Structured feedback and approval processes');
    console.log('  • Code review workflows with AI agents');
    console.log('  • Automated quality gates and checks');
    console.log('  • Human oversight of AI decisions\n');

    console.log('I - Isolation:');
    console.log('  • Agents don\'t interfere with each others\' work');
    console.log('  • Clear boundaries and responsibilities');
    console.log('  • Coordinated handoffs between phases');
    console.log('  • No unexpected side effects from other agents\n');

    console.log('G - GitOps:');
    console.log('  • Git as the single source of truth');
    console.log('  • The glue between you and your AI agents');
    console.log('  • Automated deployments from Git changes');
    console.log('  • Version-controlled AI agent configurations\n');

    console.log('O - Observability:');
    console.log('  • Complete visibility into AI activities');
    console.log('  • Metrics, logs, and tracing');
    console.log('  • Performance monitoring and alerting');
    console.log('  • Audit trails for compliance\n');

    console.log('R - Retrospectives:');
    console.log('  • Continuous learning from mistakes');
    console.log('  • Learning from positive experiences');
    console.log('  • Process improvement and refinement');
    console.log('  • Knowledge sharing and documentation\n');

    console.log('🎯 This methodology transforms you from a developer into an AI manager!');
    console.log('✨ Every rule has been tested and proven in real project environments.');
}

function showStructure() {
    console.log(banner);
    console.log('📁 FRAIM Framework Structure\n');

    console.log('📂 /rules/ - Centralized rules for all AI agents');
    console.log('  • integrity-and-test-ethics.md - Core ethical principles');
    console.log('  • simplicity.md - Keep solutions simple and focused');
    console.log('  • architecture.md - Technical architecture principles');
    console.log('  • continuous-learning.md - Learn from retrospectives and RFCs');
    console.log('  • successful-debugging-patterns.md - Debug issues systematically\n');

    console.log('📂 /workflows/ - Development phase workflows');
    console.log('  • design.md - Design phase workflow');
    console.log('  • implement.md - Implementation phase workflow');
    console.log('  • test.md - Testing phase workflow');
    console.log('  • resolve.md - Issue resolution workflow');
    console.log('  • retrospect.md - Retrospective workflow\n');

    console.log('📂 /templates/ - Standardized templates');
    console.log('  • /evidence/ - Test evidence templates');
    console.log('  • /retrospective/ - Retrospective templates');
    console.log('  • /specs/ - Specification templates');
    console.log('  • /help/ - Help documentation templates\n');

    console.log('📂 /.github/ - GitHub configuration');
    console.log('  • /workflows/ - GitHub Actions workflows');
    console.log('  • pull_request_template.md - PR template\n');

    console.log('📂 /scripts/ - Automation scripts');
    console.log('  • ensure-tests-present.sh - Test validation script');
    console.log('  • exec-with-timeout.sh - Command execution with timeout');
    console.log('  • prep-issue.sh - Issue preparation for AI agents\n');

    console.log('🎯 This structure provides a comprehensive framework for AI agent management!');
}

async function runSetup() {
    try {
        // Import and run the setup script
        const { runSetup: setupFunction } = require('../setup.js');
        setupFunction();
    } catch (error) {
        console.error('❌ Failed to run setup:', error.message);
        console.log('\n💡 Try running the setup script directly:');
        console.log('   node setup.js');
        process.exit(1);
    }
}

async function runWizard() {
    try {
        // Import and run the wizard function
        const { runWizard: wizardFunction } = require('../setup.js');
        await wizardFunction();
    } catch (error) {
        console.error('❌ Failed to run wizard:', error.message);
        console.log('\n💡 Try running the setup script directly:');
        console.log('   node setup.js');
        process.exit(1);
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }

    if (args.includes('rigor')) {
        showRigor();
        return;
    }

    if (args.includes('structure')) {
        showStructure();
        return;
    }

    if (args.includes('init') || args.includes('setup')) {
        console.log(banner);
        console.log('🚀 Setting up FRAIM in current repository...\n');
        await runSetup();
        return;
    }

    if (args.includes('wizard')) {
        console.log(banner);
        console.log('🔮 FRAIM Interactive Setup Wizard\n');
        console.log('Starting interactive wizard...\n');
        await runWizard();
        return;
    }

    // Default help for unknown commands
    console.log('❓ Unknown command. Use --help for available options.');
    showHelp();
}

// Export the main function for use in other files
module.exports = { main };

// Run the CLI if this file is executed directly
if (require.main === module) {
    main();
}