# Continuous Learning

## INTENT
To prevent repeating past mistakes and build upon existing solutions by systematically learning from retrospectives, RFCs, and historical issue patterns, ensuring continuous improvement and knowledge accumulation across all agents.

## PRINCIPLES
- **Learn from History**: Always review past work before starting new tasks
- **Build on Success**: Apply proven solutions rather than reinventing
- **Avoid Known Pitfalls**: Use retrospectives to prevent recurring issues
- **Share Knowledge**: Document learnings for future agents
- **Pattern Recognition**: Identify recurring problems and solutions

## MANDATORY LEARNING WORKFLOW

### Before Starting Any Work
1. **Search retrospectives** for related issues or similar problems
2. **Read relevant RFCs** to understand the design context
3. **Review test cases** to see expected behavior
4. **Check issue comments** for previous attempts and solutions

### Knowledge Sources
- **Retrospectives**: `/retrospectives/` folder for past problem analysis
- **RFCs**: `/docs/rfcs/` for design decisions and architectural context
- **Test Cases**: Existing tests show expected behavior patterns
- **Issue History**: Comments and PRs reveal previous attempts and solutions

## EXAMPLES

### Good: Learning from History
```
Issue: "Fix calendar sync timeout"
Before Starting: 
- ✅ Read retrospective on issue-45 (similar timeout problem)
- ✅ Found root cause: missing retry logic
- ✅ Applied proven solution: exponential backoff
- ✅ Avoided known pitfall: infinite retry loops
Result: Fixed in 1 iteration using proven approach
```

### Bad: Ignoring History
```
Issue: "Fix calendar sync timeout"
Approach: 
- ❌ Started coding immediately without research
- ❌ Implemented naive retry logic
- ❌ Hit same infinite loop issue from issue-45
- ❌ Wasted 3 iterations on known problem
Result: Eventually found retrospective, but too late
```

## RETROSPECTIVE CREATION
- **Use template**: `templates/retrospective/retro-template.md` for consistent structure
- **Follow process**: Use the `retrospect.md` workflow for retrospective creation

Remember: The best code is often written by those who learn from history rather than repeat it.