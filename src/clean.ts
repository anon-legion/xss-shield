import xss from 'xss';
import { ValidData } from './types';

function clean<T extends ValidData>(rawData: T): T {
  let data = '';
  let isObject = false;
  if (typeof rawData === 'object') {
    data = JSON.stringify(rawData);
    isObject = true;
  }

  data = xss(data as string).trim();
  if (isObject) data = JSON.parse(data);

  return data as T;
}

export default clean;
