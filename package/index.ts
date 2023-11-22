import xss from 'xss';

interface IReq {
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
}
type ValidData = IReq['body'] | IReq['query'] | IReq['params'] | string;

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
