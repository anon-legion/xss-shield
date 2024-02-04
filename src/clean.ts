import xss from 'xss';
import { ValidData } from './types';

function clean<T extends ValidData>(rawData: T): T {
  let data = JSON.stringify(rawData);
  data = xss(data as string).trim();

  return JSON.parse(data) as T;
}

export default clean;
