import {hasJsonStructure, parseJSON} from './parser';
import replace, {ReplaceInFileConfig, ReplaceResult} from 'replace-in-file';
import {Inputs} from './inputs';
import regexParser from 'regex-parser';

const parseInputs = (inputs: Inputs): ReplaceInFileConfig => {
  const config: ReplaceInFileConfig = {...inputs, countMatches: true};
  if (hasJsonStructure(inputs.from)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = parseJSON(inputs.from);
    const key = Object.keys(obj)[0];
    if (obj[key] instanceof RegExp) {
      config.from = obj[key];
    }
  }

  if (inputs.fromType && inputs.fromType === 'regexp') {
    config.from = regexParser(inputs.from);
  }

  return config;
};

const searchReplace = async (
  config: ReplaceInFileConfig,
): Promise<ReplaceResult[]> => {
  return await replace.replaceInFile(config);
};

export {searchReplace, parseInputs};
