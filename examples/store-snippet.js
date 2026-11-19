// Minimal versioned localStorage store with normalize-on-load

const STORAGE_KEY = 'app:v1';
const APP_VERSION = 1;

export function emptyState() {
  return { version: APP_VERSION, items: [] };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return emptyState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function normalizeState(input) {
  const base = emptyState();
  if (!input || typeof input !== 'object') return base;
  const items = Array.isArray(input.items)
    ? input.items.filter(i => i && typeof i.name === 'string')
    : [];
  return { version: APP_VERSION, items };
}

// Debounced autosave helper
export function makeAutosave(fn, ms = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
