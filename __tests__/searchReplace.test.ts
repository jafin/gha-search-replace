import {expect, test} from '@jest/globals';
import {searchReplace, parseInputs} from '../src/searchReplace';
import {Inputs} from '../src/inputs';
import { parseJSON } from '../src/parser';

test('parse string inputs', async () => {
  const inputs: Inputs = {files: '**/*.txt', from: 'foo', to: 'bar'};
  const config = parseInputs(inputs);
  const results = await searchReplace(config);
  expect(results).not.toBeNull();
});

test('can parse REGEX object JSON encoded', async () => {
  const inputs: Inputs = {files: '**/*.txt', from: '{"re":"__REGEXP /foo/gi"}', to: 'bar'};
  const config = parseInputs(inputs);
  expect(config.from).toEqual(new RegExp('foo','gi'));
  expect(config.to).toEqual('bar');
});


test('can parse REGEX string with fromType set', async () => {
  const inputs: Inputs = {files: '**/*.txt', from: '/foo/gi', fromType:'regexp', to: 'bar'};
  const config = parseInputs(inputs);
  expect(config.from).toEqual(new RegExp('foo','gi'));
  expect(config.to).toEqual('bar');
});


test('parseJson', () => {
  const x:any = parseJSON('{"re":"__REGEXP /foo/gi"}');
  console.log(x);
  expect(x.re).toEqual(new RegExp("foo","gi"))
});
