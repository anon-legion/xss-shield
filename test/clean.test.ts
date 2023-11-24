import { test } from 'node:test';
import clean from '../src/clean';
import assert from 'node:assert';

test('clean function - should clean a string', () => {
  const raw = '<script>alert("xss");</script>';
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, '');
});

test('clean function - should clean an object', () => {
  const raw = { prop: '<script>alert("xss");</script>' };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, { prop: '' });
});

test('clean function - should clean a nested object', () => {
  const raw = { prop: { subProp: '<script>alert("xss");</script>' } };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, { prop: { subProp: '' } });
});

test('clean function - should not modify a clean string', () => {
  const raw = 'Hello, world!';
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, raw);
});

test('clean function - should not modify a clean object', () => {
  const raw = { prop: 'Hello, world!' };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, raw);
});
