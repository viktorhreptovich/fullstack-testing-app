import type { TestProject } from 'vitest/node';
import allure from 'allure-commandline';

let allureResults = 'allure-results';
let allureReport = 'allure-report';

export async function setup(testProject: TestProject) {
  for (const reporter of testProject.config.reporters) {
    if (reporter[0] === 'allure-vitest/reporter') {
      allureResults = reporter[1]?.resultsDir;
      allureReport = reporter[1]?.reportDir;
      break;
    }
  }
}

export async function teardown(test: any) {
  const generator = allure(['generate', allureResults, '-o', allureReport]);

  generator.on('exit', () => {
    console.log('Allure report generated');
  });
}
