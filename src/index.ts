import clean from './clean';
import * as express from 'express';
import { ValidKeys } from './types';

function xssSanitizer(keys: ValidKeys[] = []) {
  return (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    if (Boolean(req.body) && (keys.includes('body') || keys.length === 0))
      req.body = clean<express.Request['body']>(req.body);
    if (Boolean(req.query) && (keys.includes('query') || keys.length === 0))
      req.query = clean<express.Request['query']>(req.query);
    if (Boolean(req.params) && (keys.includes('params') || keys.length === 0))
      req.params = clean<express.Request['params']>(req.params);

    next();
  };
}

export default xssSanitizer;
