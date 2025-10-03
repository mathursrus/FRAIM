#!/usr/bin/env node

/**
 * FRAIM Framework - Main Entry Point
 * Framework for Rigor-based AI Management
 * Where humans become AI managers through rigorous methodology
 */

const path = require('path');
const fs = require('fs');

// Import the CLI
const { main } = require('./bin/fraim.js');

// Export the main function for programmatic use
module.exports = { main };

// If this file is run directly, execute the CLI
if (require.main === module) {
    main();
}

// Framework information
module.exports.FRAIM_INFO = {
    name: 'FRAIM',
    fullName: 'Framework for Rigor-based AI Management',
    version: '1.0.0',
    description: 'Where humans become AI managers through rigorous methodology',
    methodology: 'RIGOR',
    principles: [
        'Reviews: Structured feedback and approval processes',
        'Isolation: Agents don\'t interfere with each others\' work *unless* you explicitly ask them to',
        'GitOps: Git as the single source of truth and the glue between you and your agents',
        'Observability: Complete visibility into AI activities',
        'Retrospectives: Continuous learning from mistakes and positive experiences'
    ],
    supportedAgents: ['cursor', 'claude', 'windsurf'],
    repository: 'https://github.com/mathursrus/FRAIM',
    note: 'All rules and workflows have been tested and proven in real project environments',
    
    // New structure information
    structure: {
        rules: '/rules/',
        workflows: '/workflows/',
        templates: '/templates/',
        scripts: '/scripts/',
        github: '/.github/'
    },
    
    // Centralized rules
    centralizedRules: [
        'integrity-and-test-ethics.md',
        'simplicity.md',
        'architecture.md',
        'continuous-learning.md',
        'successful-debugging-patterns.md'
    ],
    
    // Workflow templates
    workflowTemplates: [
        'design.md',
        'implement.md',
        'test.md',
        'resolve.md',
        'retrospect.md'
    ]
};