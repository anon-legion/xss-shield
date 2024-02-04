import * as express from 'express';

export type ValidData =
  | express.Request['body']
  | express.Request['params']
  | express.Request['query'];

export type ValidKeys = 'body' | 'params' | 'query';
