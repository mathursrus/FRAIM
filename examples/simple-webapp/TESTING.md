# Testing with FRAIM Framework

This directory contains example test cases that demonstrate how to use the FRAIM testing framework with proper tagging and structure.

## Test Structure

The example test file (`example-test.ts`) demonstrates:

- **BaseTestCase Interface**: All test cases extend the `BaseTestCase` interface
- **Tagging System**: Tests are tagged with categories like `smoke`, `integration`, `performance`, etc.
- **Test Organization**: Tests are organized by functionality and complexity
- **Mock Functions**: Example mock functions for common scenarios

## Recommended Test Tags (you can add others to your preference)

- **`smoke`**: Critical tests that must pass for basic functionality
- **`flaky`**: Tests that may be unreliable or environment-dependent
- **`failing`**: Tests that are currently failing and need debugging

## Running Tests

### Run All Tests
```bash
npx run test example-test.ts
```

### Run Only Smoke Tests
```bash
npx run test-smoke example-test.ts
```

### Run Only Flaky Tests
```bash
npx run test-flkay *test*.ts
```

## Best Practices

1. **Always use tags**: Tag your tests appropriately for easy filtering
2. **Include descriptions**: Provide clear descriptions of what each test does
3. **Use meaningful names**: Test names should clearly indicate what's being tested
4. **Handle errors gracefully**: Catch and report errors appropriately
5. **Use mocks for external dependencies**: Don't rely on external services in tests
6. **Test both success and failure cases**: Ensure your tests cover edge cases

## Integration with FRAIM

This testing framework integrates with FRAIM's agent coordination system:

- **AI Agents**: Use these tests during implementation phase
- **CI/CD**: Automated test execution with proper tagging
- **Evidence Collection**: Test results are collected as evidence for reviews

## Customization

To adapt this testing framework for your project:

1. **Update mock functions**: Replace example mocks with your actual functions
2. **Add project-specific tags**: Define tags relevant to your domain
3. **Customize test structure**: Modify the test case interface as needed
4. **Add setup/teardown**: Include any necessary test setup or cleanup
5. **Configure CI integration**: Set up automated test execution in your CI pipeline
