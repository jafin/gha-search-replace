// eslint-disable-next-line filenames/match-regex
import replace, {ReplaceResult} from 'replace-in-file';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchReplace = async (options: any): Promise<ReplaceResult[]> => {
  const results = await replace.replaceInFile(options);
  return results;
};

export {searchReplace};
