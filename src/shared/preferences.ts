export const preferenceDefinitions = [
  { id: 'salt', label: 'Salt', description: 'Sodium and salt-related terms' },
  { id: 'sugar', label: 'Sugar', description: 'Added sugars and sugar-related terms' },
  { id: 'gluten', label: 'Gluten', description: 'Gluten-containing ingredients' },
  { id: 'lactose', label: 'Lactose', description: 'Lactose and dairy-related terms' },
  { id: 'eggs', label: 'Eggs', description: 'Egg and egg-derived ingredients' },
  { id: 'fish', label: 'Fish', description: 'Fish and fish-derived ingredients' },
  { id: 'soy', label: 'Soy', description: 'Soy and soy-derived ingredients' },
  { id: 'nuts', label: 'Nuts', description: 'Tree nuts and peanuts' },
] as const;

export type PreferenceId = (typeof preferenceDefinitions)[number]['id'];
export type PreferenceValue = 'ignore' | 'reduce' | 'avoid';
export type Preferences = Record<PreferenceId, PreferenceValue>;

export const preferenceChoices: ReadonlyArray<{
  value: PreferenceValue;
  label: string;
}> = [
  { value: 'ignore', label: 'Do not highlight' },
  { value: 'reduce', label: 'Highlight for reduction' },
  { value: 'avoid', label: 'Highlight to avoid' },
];

export const defaultPreferences: Preferences = {
  salt: 'ignore',
  sugar: 'ignore',
  gluten: 'ignore',
  lactose: 'ignore',
  eggs: 'ignore',
  fish: 'ignore',
  soy: 'ignore',
  nuts: 'ignore',
};
