import clean from './clean';
import { Request, Response, NextFunction } from 'express';
import { ValidKeys } from './types';

function xssSanitizer(keys: ValidKeys[] = []) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (Boolean(req.body) && (keys.includes('body') || keys.length === 0))
      req.body = clean<Request['body']>(req.body);
    if (Boolean(req.query) && (keys.includes('query') || keys.length === 0))
      req.query = clean<Request['query']>(req.query);
    if (Boolean(req.params) && (keys.includes('params') || keys.length === 0))
      req.params = clean<Request['params']>(req.params);

    next();
  };
}

export default xssSanitizer;
