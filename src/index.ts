import * as core from '@actions/core';
import {searchReplace} from './searchReplace';
async function run(): Promise<void> {
  try {
    const options = {
      files: core.getInput('files'),
      from: core.getInput('from'),
      to: core.getInput('to'),
    };

    core.debug(`options: $JSON.stringify(options)`);

    const results = searchReplace(options);
    core.setOutput('modifiedFiles', results);
  } catch (error: any) {
    const err = error as Error;
    core.setFailed(err.message);
  }
}

run();
