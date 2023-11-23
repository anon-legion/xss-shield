export interface IReq {
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
}

export type ValidData = IReq['body'] | IReq['query'] | IReq['params'] | string;

export type ValidKeys = 'body' | 'params' | 'query';
