test('clean function - should clean an array of strings', () => {
  const raw = ['Hello, world!', '<script>alert("xss");</script>'];
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, ['Hello, world!', '']);
});

test('clean function - should clean an array of objects', () => {
  const raw = [{ prop: 'Hello, world!' }, { prop: '<script>alert("xss");</script>' }];
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, [{ prop: 'Hello, world!' }, { prop: '' }]);
});

test('clean function - should clean a complex nested object', () => {
  const raw = {
    prop1: 'Hello, world!',
    prop2: '<script>alert("xss");</script>',
    prop3: {
      subProp1: 'Hello, world!',
      subProp2: '<script>alert("xss");</script>',
    },
  };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, {
    prop1: 'Hello, world!',
    prop2: '',
    prop3: {
      subProp1: 'Hello, world!',
      subProp2: '',
    },
  });
});

test('clean function - should handle null values', () => {
  const raw = { prop: null };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, { prop: null });
});

test('clean function - should handle undefined values', () => {
  const raw = { prop: undefined };
  const cleaned = clean(raw);
  assert.deepEqual(cleaned, { prop: undefined });
});