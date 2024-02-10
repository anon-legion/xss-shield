import { describe, it } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import clean from '../src/clean';

describe('clean function', () => {
  it('should clean a string', () => {
    const raw = 'Hello, world! <script>alert("xss");</script>';
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, 'Hello, world!');
  });

  it('should clean an array of strings', () => {
    const raw = ['Hello, world!', '<script>alert("xss");</script>'];
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, ['Hello, world!', '']);
  });

  it('should clean an array of objects', () => {
    const raw = [{ prop: 'Hello, world!' }, { prop: '<script>alert("xss");</script>' }];
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, [{ prop: 'Hello, world!' }, { prop: '' }]);
  });

  it('should clean a complex nested object', () => {
    const raw = {
      prop1: 'Hello, world!',
      prop2: '<script>alert("xss");</script>',
      prop3: {
        subProp1: 'Hello, world!',
        subProp2: '<script>alert("xss");</script>',
      },
    };
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, {
      prop1: 'Hello, world!',
      prop2: '',
      prop3: {
        subProp1: 'Hello, world!',
        subProp2: '',
      },
    });
  });

  it('should handle null values', () => {
    const raw = { prop: null };
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, { prop: null });
  });

  it('should handle undefined values', () => {
    const raw = { prop: undefined };
    const cleaned = clean(raw);
    deepStrictEqual(cleaned, { prop: undefined });
  });
});
