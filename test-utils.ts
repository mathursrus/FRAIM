import dotenv from 'dotenv';
dotenv.config({override:true});

import { test } from 'node:test';


// Base test case interface that all test cases should extend
export interface BaseTestCase {
  name: string;
  description?: string;
  tags?: string[];
  testFn?: () => Promise<boolean>;
}

// Global tracker for failed tests across all suites
const globalFailedTests: string[] = [];

// Generic test runner function that can run any type of test

export async function runTests<T extends BaseTestCase>(
  testCases: T[],
  runTestFn: (testCase: T) => Promise<boolean>,
  testTitle: string
): Promise<void> {
  console.log(`🧪 Testing ${testTitle}...\n`);
  
  // Check if we need to filter by tags
  let tagsFilter: string[] = [];
  
  console.log(`Command line arguments: ${process.argv.join(', ')}`);
  
  // First try command line arguments
  const tagsArg = process.argv.find(arg => arg && typeof arg === 'string' && arg.startsWith('--tags='));
  if (tagsArg) {
    const tagValue = tagsArg.split('=')[1];
    if (tagValue) {
      tagsFilter = tagValue.split(',');
      console.log(`Filtering tests by tags (from CLI): ${tagsFilter.join(', ')}`);
    }
  }
  
  // Then try environment variable (for npm scripts)
  if (tagsFilter.length === 0 && process.env.TAGS) {
    tagsFilter = process.env.TAGS.split(',');
    console.log(`Filtering tests by tags (from ENV): ${tagsFilter.join(', ')}`);
  }
  
  // Check for exclusion tags
  let excludeTags: string[] = [];
  if (process.env.EXCLUDE_TAGS) {
    excludeTags = process.env.EXCLUDE_TAGS.split(',');
    console.log(`Excluding tests with tags (from ENV): ${excludeTags.join(', ')}`);
  }
  
  // Filter test cases by tags if specified
  const testsToRun = testCases.filter(test => {
    // First check inclusion filter
    if (tagsFilter.length > 0) {
      // Ensure test.tags exists before calling .some() on it
      if (!test.tags || !test.tags.some(tag => tagsFilter.includes(tag))) {
        return false;
      }
    }
    
    // Then check exclusion filter
    if (excludeTags.length > 0) {
      // Exclude tests with specified tags
      if (test.tags && test.tags.some(tag => excludeTags.includes(tag))) {
        return false;
      }
    }
    
    return true;
  });
  
  if (testsToRun.length === 0) {
    console.log('No tests to run for suite: ' + testTitle);
    return;
  }

  console.log(`Running ${testsToRun.length} tests${tagsFilter.length > 0 ? ` with tags: ${tagsFilter.join(', ')}` : ''}\n`);
  
  // Use Node.js built-in test() function for each test case
  // This allows the TAP reporter to properly aggregate results across all test files
  for (const testCase of testsToRun) {
    await test(testCase.name, async () => {
      try {
        const success = await runTestFn(testCase);
        if (!success) {
          const failedTestName = `${testTitle}: ${testCase.name}`;
          if (!globalFailedTests.includes(failedTestName)) {
            globalFailedTests.push(failedTestName);
          }
          throw new Error(`Test failed: ${testCase.name}`);
        }
      } catch (error) {
        const failedTestName = `${testTitle}: ${testCase.name}`;
        if (!globalFailedTests.includes(failedTestName)) {
          globalFailedTests.push(failedTestName);
        }
        throw error;
      }
    });
  }

  // Display comprehensive final summary
  console.log(`\n🚨 FINAL TEST SUMMARY:`);
  console.log(`   ❌ Total Failed Tests: ${globalFailedTests.length}`);
  
  if (globalFailedTests.length > 0) {
    console.log(`   📋 Failed Test Names:`);
    globalFailedTests.forEach(testName => {
      console.log(`   - ${testName}`);
    });
  }

  process.exit(globalFailedTests.length > 0 ? 1 : 0);
}