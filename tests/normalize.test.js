// Run with: node tests/normalize.test.js
// (or adapt to your test runner)

function normalizeState(input) {
  const base = { version: 1, items: [] };
  if (!input || typeof input !== 'object') return base;
  const items = Array.isArray(input.items)
    ? input.items.filter(i => i && typeof i.name === 'string')
    : [];
  return { version: 1, items };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

assert(normalizeState(null).items.length === 0, 'null input');
assert(normalizeState({ items: [{ name: 'a' }] }).items.length === 1, 'valid item');
assert(normalizeState({ items: [{ name: 1 }] }).items.length === 0, 'invalid item filtered');

console.log('normalize tests passed');
