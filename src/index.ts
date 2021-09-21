import * as core from '@actions/core';
import {searchReplace} from './searchReplace';
async function run(): Promise<void> {
  try {
    const options = {
      files: core.getInput('include'),
      from: core.getInput('search'),
      to: core.getInput('replace'),
      countMatches: true,
    };

    core.debug(`options: $JSON.stringify(options)`);

    const results = await searchReplace(options);
    core.setOutput('modifiedFiles', results);

    let filesChanged = 0;
    for (const result of results) {
      if (result.hasChanged) {
        filesChanged++;
        if (result.numReplacements && result.numReplacements > 1) {
          core.info(
            `File: ${result.file} had ${result.numReplacements} matches.`,
          );
        } else {
          core.info(
            `File: ${result.file} had ${result.numReplacements} match.`,
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
