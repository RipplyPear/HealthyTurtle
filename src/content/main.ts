const storageKey = 'preferences';

function isActivePreference(value: unknown): boolean {
  return value === 'reduce' || value === 'avoid';
}

async function initializeContentScript(): Promise<void> {
  const result = await chrome.storage.sync.get(storageKey);
  const storedPreferences = result[storageKey];

  const activePreferenceCount =
    typeof storedPreferences === 'object' && storedPreferences !== null
      ? Object.values(storedPreferences).filter(isActivePreference).length
      : 0;

  document.documentElement.dataset.healthyTurtle = 'ready';
  document.documentElement.dataset.healthyTurtlePreferences = String(activePreferenceCount);
}

void initializeContentScript();
