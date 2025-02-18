import * as fs from 'fs';
import * as path from 'path';

interface Interaction {
  description: string;
  request: any;
  response: any;
}

interface PactFile {
  provider: { name: string };
  interactions: Interaction[];
}

export interface PactInteractionFile {
  interaction: Interaction;
  file: string;
}

export function processPactFiles(providerName: string): PactInteractionFile[] {
  const pactsDir = path.resolve(__dirname, __PACT_DIR__);
  const tempPactsDir = path.resolve(__dirname, __PACT_DIR_TEMP__);
  console.log('Start processing pacts in', pactsDir);
  console.log('Generated temp pacts in', tempPactsDir);

  if (!fs.existsSync(tempPactsDir)) {
    fs.mkdirSync(tempPactsDir, { recursive: true });
  }

  const files = fs.readdirSync(pactsDir).filter((file) => path.extname(file) === '.json');

  const result: PactInteractionFile[] = [];
  console.log('Processing files:', files);
  for (const file of files) {
    const filePath = path.join(pactsDir, file);
    console.error('Processing file:', filePath);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const pactFile: PactFile = JSON.parse(content);

      if (pactFile.provider.name === providerName) {
        for (const interaction of pactFile.interactions) {
          const uniqueFileName = `${interaction.description.replace(/\s+/g, '-')}.json`;
          const outputFilePath = path.join(tempPactsDir, uniqueFileName);

          if (!result.some((item) => item.file === outputFilePath)) {
            const newPactFile = { ...pactFile, interactions: [interaction] };
            fs.writeFileSync(outputFilePath, JSON.stringify(newPactFile, null, 2));
            result.push({ interaction, file: outputFilePath });
          }
        }
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  return result;
}
