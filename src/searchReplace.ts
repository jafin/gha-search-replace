import replace, { ReplaceResult } from 'replace-in-file'

const searchReplace = async (options: any): Promise<ReplaceResult[]> => {
  const results = await replace.replaceInFile(options)
  console.log('Replacement results:', results)
  return results
}

export {searchReplace};