import * as core from '@actions/core';
import {parseInputs, searchReplace} from './searchReplace';
import {Inputs} from './inputs';

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      files: core.getInput('include'),
      from: core.getInput('search'),
      to: core.getInput('replace'),
    };

    const config = parseInputs(inputs);
    core.debug(`config: ${JSON.stringify(config)}`);
    const results = await searchReplace(config);
    core.setOutput('modifiedFiles', results);

    let filesChanged = 0;
    for (const result of results) {
      if (result.hasChanged) {
        filesChanged++;
        if (result.numReplacements && result.numReplacements > 1) {
          core.info(
            `File: ${result.file} had ${result.numMatches} matches & ${result.numReplacements} replacements.`,
          );
        } else {
          core.info(
            `File: ${result.file} had ${result.numMatches} matches & ${result.numReplacements} replacements.`,
          );
        }
      }
    }
    // eslint-disable-next-line i18n-text/no-en
    core.info(`Total files modified ${filesChanged}`);
  } catch (error: unknown) {
    const err = error as Error;
    core.setFailed(err.message);
  }
}

run();
