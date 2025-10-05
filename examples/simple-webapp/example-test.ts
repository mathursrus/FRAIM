#!/usr/bin/env tsx

/**
 * Example Test Case for FRAIM Framework
 * 
 * This demonstrates how to write test cases using the FRAIM testing framework
 * with proper tagging and structure.
 */

import { BaseTestCase, runTests } from '../../test-utils';

// Example test case interface extending BaseTestCase
interface ExampleTestCase extends BaseTestCase {
  description: string;
  testFunction: () => Promise<boolean>;
}

// Example test cases with different tags
const EXAMPLE_TEST_CASES: ExampleTestCase[] = [
  {
    name: 'test_basic_functionality',
    tags: ['smoke', 'basic'],
    description: 'Should verify basic application functionality works',
    testFunction: async () => {
      console.log('🧪 Testing basic functionality...');
      
      // Example: Test that a basic function works
      const result = await basicFunction();
      
      if (result !== 'success') {
        console.log(`❌ Expected 'success', got '${result}'`);
        return false;
      }
      
      console.log('✅ Basic functionality test passed');
      return true;
    }
  },
  {
    name: 'test_user_authentication',
    tags: ['smoke', 'auth'],
    description: 'Should verify user authentication works correctly',
    testFunction: async () => {
      console.log('🧪 Testing user authentication...');
      
      // Example: Test authentication flow
      const authResult = await authenticateUser('test@example.com', 'password123');
      
      if (!authResult.success) {
        console.log(`❌ Authentication failed: ${authResult.error}`);
        return false;
      }
      
      console.log('✅ User authentication test passed');
      return true;
    }
  },
  {
    name: 'test_api_integration',
    tags: ['integration', 'api'],
    description: 'Should verify API integration works correctly',
    testFunction: async () => {
      console.log('🧪 Testing API integration...');
      
      // Example: Test API call
      const apiResult = await callExternalAPI('https://api.example.com/data');
      
      if (!apiResult || !apiResult.data) {
        console.log('❌ API integration failed - no data returned');
        return false;
      }
      
      console.log('✅ API integration test passed');
      return true;
    }
  },
  {
    name: 'test_database_operations',
    tags: ['database', 'integration'],
    description: 'Should verify database operations work correctly',
    testFunction: async () => {
      console.log('🧪 Testing database operations...');
      
      // Example: Test database operations
      const dbResult = await performDatabaseOperation();
      
      if (!dbResult.success) {
        console.log(`❌ Database operation failed: ${dbResult.error}`);
        return false;
      }
      
      console.log('✅ Database operations test passed');
      return true;
    }
  },
  {
    name: 'test_performance_benchmark',
    tags: ['performance', 'flaky'],
    description: 'Should verify performance meets requirements (may be flaky)',
    testFunction: async () => {
      console.log('🧪 Testing performance benchmark...');
      
      const startTime = Date.now();
      await performExpensiveOperation();
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      const maxDuration = 1000; // 1 second
      
      if (duration > maxDuration) {
        console.log(`❌ Performance test failed: ${duration}ms > ${maxDuration}ms`);
        return false;
      }
      
      console.log(`✅ Performance test passed: ${duration}ms`);
      return true;
    }
  },
  {
    name: 'test_failing_scenario',
    tags: ['failing', 'debug'],
    description: 'This test is currently failing and needs debugging',
    testFunction: async () => {
      console.log('🧪 Testing failing scenario...');
      
      // This test is intentionally failing to demonstrate the failing tag
      console.log('❌ This test is currently failing for demonstration');
      return false;
    }
  }
];

// Mock functions for demonstration
async function basicFunction(): Promise<string> {
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 10));
  return 'success';
}

async function authenticateUser(email: string, password: string): Promise<{success: boolean, error?: string}> {
  // Simulate authentication
  await new Promise(resolve => setTimeout(resolve, 50));
  
  if (email === 'test@example.com' && password === 'password123') {
    return { success: true };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

async function callExternalAPI(url: string): Promise<{data?: any}> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    data: {
      id: 1,
      name: 'Test Data',
      timestamp: new Date().toISOString()
    }
  };
}

async function performDatabaseOperation(): Promise<{success: boolean, error?: string}> {
  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 75));
  
  return { success: true };
}

async function performExpensiveOperation(): Promise<void> {
  // Simulate expensive operation
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Test runner function
const runExampleTest = async (testCase: ExampleTestCase): Promise<boolean> => {
  try {
    return await testCase.testFunction();
  } catch (error) {
    console.log(`❌ Test ${testCase.name} threw an error: ${error}`);
    return false;
  }
};

await runTests(EXAMPLE_TEST_CASES, runExampleTest, 'Example Test Suite');
