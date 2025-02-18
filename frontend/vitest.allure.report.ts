import type { TestProject } from 'vitest/node';

let allure = require('allure-commandline');
let allureResults = 'allure-results';
let allureReport = 'allure-report';

export async function setup(testProject: TestProject) {
  for (let reporter of testProject.config.reporters) {
    if (reporter[0] === 'allure-vitest/reporter') {
      allureResults = reporter[1]?.resultsDir;
      allureReport = reporter[1]?.reportDir;
      break;
    }
  }
}

export async function teardown(test: any) {
  let generator = allure(['generate', allureResults, '-o', allureReport]);

  generator.on('exit', () => {
    console.log('Allure report generated');
  });
}
