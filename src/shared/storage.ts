import {
  defaultPreferences,
  preferenceDefinitions,
  type PreferenceId,
  type PreferenceValue,
  type Preferences,
} from './preferences';

const storageKey = 'preferences';

function isPreferenceValue(value: unknown): value is PreferenceValue {
  return value === 'ignore' || value === 'reduce' || value === 'avoid';
}

export async function loadPreferences(): Promise<Preferences> {
  const result = await chrome.storage.sync.get(storageKey);
  const storedPreferences = result[storageKey];

  if (typeof storedPreferences !== 'object' || storedPreferences === null) {
    return { ...defaultPreferences };
  }

  const preferences = { ...defaultPreferences };
  const candidatePreferences = storedPreferences as Record<string, unknown>;

  for (const definition of preferenceDefinitions) {
    const candidate = candidatePreferences[definition.id];

    if (isPreferenceValue(candidate)) {
      preferences[definition.id] = candidate;
    }
  }

  return preferences;
}

export async function savePreferences(preferences: Preferences): Promise<void> {
  await chrome.storage.sync.set({ [storageKey]: preferences });
}

export function isPreferenceId(value: string): value is PreferenceId {
  return preferenceDefinitions.some((definition) => definition.id === value);
}
