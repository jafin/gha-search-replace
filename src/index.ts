import * as core from '@actions/core';
import {searchReplace} from './searchReplace';
async function run(): Promise<void> {
  try {
    const options = {
      files: core.getInput('include'),
      from: core.getInput('from'),
      to: core.getInput('to'),
    };

    core.debug(`options: $JSON.stringify(options)`);

    const results = await searchReplace(options);
    core.setOutput('modifiedFiles', results);
  } catch (error: unknown) {
    const err = error as Error;
    core.setFailed(err.message);
  }
}

run();
