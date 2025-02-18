//custom PactV3
import { PactV3 } from '@pact-foundation/pact';
import * as allure from 'allure-js-commons';
import path from 'node:path';
import fs from 'node:fs';

export type Pact = PactV3 & {
  consumerName: string;
  providerName: string;
  contractFilePath: string;
  attachContract: (testName: string) => Promise<void>;
};

interface ProviderOptions {
  consumer?: string;
  provider?: string;
}

export const pact = (options?: ProviderOptions) => {
  const { consumer, provider } = options || {};
  const consumerName = consumer || 'frontend';
  const providerName = provider || 'backend';
  const contractFilePath = path.resolve(`${__PACT_CONSUMER_DIR__}/${consumerName}-${providerName}.json`);
  const pact = new PactV3({
    consumer: consumerName,
    provider: providerName,
    dir: __PACT_CONSUMER_DIR__,
    logLevel: 'info',
    port: 3001,
  });

  return Object.assign(pact, {
    consumerName,
    providerName,
    contractFilePath,
    attachContract: async (testName: string) => {
      const pactFilePath = path.resolve(contractFilePath);
      const pactContent = JSON.parse(fs.readFileSync(pactFilePath, 'utf8'));
      const attachContent = pactContent.interactions.find(
          (interaction: { description: string; })  => interaction.description === testName
      );
      await allure.attachment('Contract', JSON.stringify(attachContent, null, 2), 'application/json');
    },
  });
};
