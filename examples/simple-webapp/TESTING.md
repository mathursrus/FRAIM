# Testing with FRAIM Framework

This directory contains example test cases that demonstrate how to use the FRAIM testing framework with proper tagging and structure.

## Test Structure

The example test file (`example-test.ts`) demonstrates:

- **BaseTestCase Interface**: All test cases extend the `BaseTestCase` interface
- **Tagging System**: Tests are tagged with categories like `smoke`, `integration`, `performance`, etc.
- **Test Organization**: Tests are organized by functionality and complexity
- **Mock Functions**: Example mock functions for common scenarios

## Available Test Tags

- **`smoke`**: Critical tests that must pass for basic functionality
- **`basic`**: Basic functionality tests
- **`auth`**: Authentication-related tests
- **`integration`**: Integration tests with external services
- **`api`**: API-specific tests
- **`database`**: Database operation tests
- **`performance`**: Performance and benchmark tests
- **`flaky`**: Tests that may be unreliable or environment-dependent
- **`failing`**: Tests that are currently failing and need debugging
- **`debug`**: Tests used for debugging purposes

## Running Tests

### Run All Tests
```bash
npx tsx example-test.ts
```

### Run Only Smoke Tests
```bash
npx tsx example-test.ts --tags=smoke
```

### Run Integration Tests
```bash
npx tsx example-test.ts --tags=integration
```

### Run Multiple Tag Types
```bash
npx tsx example-test.ts --tags=smoke,integration
```

### Exclude Flaky Tests
```bash
EXCLUDE_TAGS=flaky npx tsx example-test.ts
```

### Using npm Scripts (if configured)
```bash
npm run test-smoke example-test.ts
npm run test-flaky example-test.ts
npm run test-failing example-test.ts
```

## Test Case Examples

### Smoke Test
```typescript
{
  name: 'test_basic_functionality',
  tags: ['smoke', 'basic'],
  description: 'Should verify basic application functionality works',
  testFunction: async () => {
    // Critical functionality test
    return true;
  }
}
```

### Integration Test
```typescript
{
  name: 'test_api_integration',
  tags: ['integration', 'api'],
  description: 'Should verify API integration works correctly',
  testFunction: async () => {
    // Test external API integration
    return true;
  }
}
```

### Performance Test
```typescript
{
  name: 'test_performance_benchmark',
  tags: ['performance', 'flaky'],
  description: 'Should verify performance meets requirements',
  testFunction: async () => {
    // Performance benchmark test
    return true;
  }
}
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

- **Cursor**: Uses these tests during implementation phase
- **Windsurf**: Uses these tests during testing and optimization phases
- **CI/CD**: Automated test execution with proper tagging
- **Evidence Collection**: Test results are collected as evidence for reviews

## Customization

To adapt this testing framework for your project:

1. **Update mock functions**: Replace example mocks with your actual functions
2. **Add project-specific tags**: Define tags relevant to your domain
3. **Customize test structure**: Modify the test case interface as needed
4. **Add setup/teardown**: Include any necessary test setup or cleanup
5. **Configure CI integration**: Set up automated test execution in your CI pipeline
