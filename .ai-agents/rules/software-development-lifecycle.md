# Software Development Lifecycle

## INTENT
To establish a systematic, phase-based development process that ensures quality, maintainability, and proper documentation throughout the software development lifecycle.

## PRINCIPLES
- **Phase-Based Development**: Clear phases with defined deliverables
- **Quality Gates**: Each phase has completion criteria
- **Documentation**: Comprehensive documentation at each phase
- **Review Process**: Peer review and approval at key milestones
- **Traceability**: Clear links between requirements, design, and implementation

## DEVELOPMENT WORKFLOW

### Branch Management
Always work on the feature branch for the current issue: `feature/<issue#>-<kebab-title>`. Never push to master.

### Development Workflow
1. **Clone Setup**: Work in your own cloned repository folder. Folder name should be `{PROJECT_NAME} - Issue {issue_number}`
2. **Branch Management**: Create/checkout feature branch for your issue
3. **Local Development**: Make changes, run tests locally
4. **Check before commit**: Only commit after approval from the user.
5. **Push Changes**: Push to feature branch, never to master
6. **PR Creation**: Let GitHub Actions create/update PRs automatically

## PHASE-BASED DEVELOPMENT

### Phase 1: Specification (phase:spec)
**Objective**: Define what needs to be built

**Activities**:
- Gather requirements from stakeholders
- Define functional and non-functional requirements
- Create user stories and acceptance criteria
- Document constraints and assumptions
- Risk assessment and mitigation planning

**Deliverables**:
- Requirements specification document
- User stories with acceptance criteria
- Risk assessment
- Success metrics definition

**Completion Criteria**:
- All requirements documented and approved
- Stakeholder sign-off obtained
- Technical feasibility confirmed
- Success criteria defined and measurable

### Phase 2: Design (phase:design)
**Objective**: Define how it will be built

**Activities**:
- System architecture design
- Component design and interfaces
- Database schema design
- API specification
- Security design considerations
- Performance requirements analysis

**Deliverables**:
- Architecture design document
- Component diagrams
- Database schema
- API specifications
- Security design
- Performance benchmarks

**Completion Criteria**:
- Design document complete and approved
- Architecture review passed
- Security review completed
- Performance requirements validated

### Phase 3: Test Planning (phase:tests)
**Objective**: Define how it will be tested

**Activities**:
- Test strategy development
- Test case creation
- Test data preparation
- Test environment setup
- Automation test planning
- Performance test planning

**Deliverables**:
- Test plan document
- Test cases and scenarios
- Test data sets
- Automated test scripts
- Performance test plan

**Completion Criteria**:
- Comprehensive test plan approved
- Test cases cover all requirements
- Test automation framework ready
- Test environment configured

### Phase 4: Implementation (phase:impl)
**Objective**: Build the solution

**Activities**:
- Code implementation
- Unit testing
- Integration testing
- Code review
- Documentation updates
- Performance optimization

**Deliverables**:
- Working software
- Unit tests
- Integration tests
- Code documentation
- Updated system documentation

**Completion Criteria**:
- All features implemented per design
- All tests passing
- Code review completed
- Documentation updated
- Performance requirements met

## QUALITY GATES

### Specification Gate
- [ ] Requirements are clear and testable
- [ ] Stakeholder approval obtained
- [ ] Technical feasibility confirmed
- [ ] Success criteria defined

### Design Gate
- [ ] Architecture is sound and scalable
- [ ] Security considerations addressed
- [ ] Performance requirements feasible
- [ ] Design review approved

### Test Gate
- [ ] Test coverage is comprehensive
- [ ] Test automation is in place
- [ ] Test environment is ready
- [ ] Test plan approved

### Implementation Gate
- [ ] All functionality implemented
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation complete
- [ ] Performance validated

## DOCUMENTATION REQUIREMENTS

### Phase Documentation
Each phase must produce:
- Phase-specific deliverables
- Decision rationale
- Assumptions and constraints
- Risks and mitigation strategies
- Review and approval records

### Code Documentation
- Inline code comments for complex logic
- API documentation
- Configuration documentation
- Deployment documentation
- Troubleshooting guides

### Process Documentation
- Development setup instructions
- Testing procedures
- Deployment procedures
- Maintenance procedures

## REVIEW PROCESS

### Design Reviews
- Architecture review by senior developers
- Security review by security team
- Performance review by performance team
- Stakeholder review for business alignment

### Code Reviews
- Peer review of all code changes
- Security review for sensitive changes
- Performance review for critical paths
- Documentation review

### Testing Reviews
- Test plan review
- Test case review
- Test results review
- Performance test review

## BRANCH AND MERGE STRATEGY

### Branch Naming
- Feature branches: `feature/{issue-number}-{description}`
- Hotfix branches: `hotfix/{issue-number}-{description}`
- Release branches: `release/{version}`

### Merge Requirements
- All tests must pass
- Code review approved
- Documentation updated
- No merge conflicts
- Branch up to date with master

### Merge Process
1. Create pull request from feature branch
2. Automated tests run
3. Code review conducted
4. Approval obtained
5. Merge to master
6. Deploy to staging
7. Validation testing
8. Deploy to production

## CLEANUP PROCESS

### End of Development
When work is complete, clean up your environment:

```bash
# Navigate out of local clone
cd ..

# Remove your local clone folder
rm -rf "{PROJECT_NAME} - Issue {issue_number}"
```

### Branch Cleanup
- Delete feature branch after merge
- Clean up local branches
- Archive old release branches

## CONTINUOUS IMPROVEMENT

### Retrospectives
- Conduct retrospectives after each major release
- Document lessons learned
- Update processes based on feedback
- Share learnings across teams

### Metrics Collection
- Track development velocity
- Monitor defect rates
- Measure test coverage
- Analyze performance metrics

### Process Updates
- Regular review of development processes
- Update based on industry best practices
- Incorporate team feedback
- Align with organizational standards

## COMPLIANCE AND GOVERNANCE

### Code Standards
- Follow established coding standards
- Use automated code formatting
- Enforce code quality metrics
- Regular code quality audits

### Security Requirements
- Security code review for all changes
- Vulnerability scanning
- Dependency security checks
- Security testing

### Documentation Standards
- Consistent documentation format
- Regular documentation updates
- Version control for documentation
- Accessibility compliance

Respect CODEOWNERS; don't modify auth/CI without approval.