const listeners = new Set();

let state = {
  isOnline: navigator.onLine,
  isBackendOnline: true,
};

export function getNetworkStatus() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function updateNetworkStatus(partial) {
  state = { ...state, ...partial };
  listeners.forEach(fn => fn(state));
}

window.addEventListener('online', () => updateNetworkStatus({ isOnline: true }));
window.addEventListener('offline', () => updateNetworkStatus({ isOnline: false }));
