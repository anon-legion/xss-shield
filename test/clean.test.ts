// import the clean function
import clean from './index';

describe('clean function', () => {
  it('should clean a string', () => {
    const raw = '<script>alert("xss");</script>';
    const cleaned = clean(raw);
    expect(cleaned).toBe('');
  });

  it('should clean an object', () => {
    const raw = { prop: '<script>alert("xss");</script>' };
    const cleaned = clean(raw);
    expect(cleaned).toEqual({ prop: '' });
  });

  it('should clean a nested object', () => {
    const raw = { prop: { subProp: '<script>alert("xss");</script>' } };
    const cleaned = clean(raw);
    expect(cleaned).toEqual({ prop: { subProp: '' } });
  });

  it('should not modify a clean string', () => {
    const raw = 'Hello, world!';
    const cleaned = clean(raw);
    expect(cleaned).toBe(raw);
  });

  it('should not modify a clean object', () => {
    const raw = { prop: 'Hello, world!' };
    const cleaned = clean(raw);
    expect(cleaned).toEqual(raw);
  });
});
