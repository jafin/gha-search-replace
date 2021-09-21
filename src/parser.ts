function replacer(key: string, value: unknown): string | unknown {
  if (value instanceof RegExp) return `__REGEXP ${value.toString()}`;
  else return value;
}

function reviver(key: string, value: string): string | RegExp | undefined {
  if (value.toString().startsWith('__REGEXP ')) {
    const m = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
    if (m !== null) return new RegExp(m[1], m[2] || '');
  } else return value;
}

function hasJsonStructure(str: string): boolean {
  if (typeof str !== 'string') return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

function parseJSON(json: string): unknown {
  return JSON.parse(json, reviver);
}

export {replacer, reviver, parseJSON, hasJsonStructure};
