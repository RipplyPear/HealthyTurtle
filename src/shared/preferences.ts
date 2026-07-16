export const preferenceDefinitions = [
  { id: 'salt', label: 'Sare', description: 'Sare, sodiu și termeni asociați' },
  { id: 'sugar', label: 'Zahăr', description: 'Zahăr și termeni asociați' },
  { id: 'gluten', label: 'Gluten', description: 'Ingrediente care conțin gluten' },
  { id: 'lactose', label: 'Lactoză', description: 'Lactoză și derivate din lapte' },
  { id: 'eggs', label: 'Ouă', description: 'Ouă și ingrediente derivate' },
  { id: 'fish', label: 'Pește', description: 'Pește și ingrediente derivate' },
  { id: 'soy', label: 'Soia', description: 'Soia și ingrediente derivate' },
  { id: 'nuts', label: 'Nuci și arahide', description: 'Nuci, arahide și derivate' },
] as const;

export type PreferenceId = (typeof preferenceDefinitions)[number]['id'];
export type PreferenceValue = 'ignore' | 'reduce' | 'avoid';
export type Preferences = Record<PreferenceId, PreferenceValue>;

export function getPreferenceDefinition(id: PreferenceId) {
  const definition = preferenceDefinitions.find((preference) => preference.id === id);

  if (!definition) {
    throw new Error(`Unknown preference: ${id}`);
  }

  return definition;
}

export const preferenceChoices: ReadonlyArray<{
  value: PreferenceValue;
  label: string;
}> = [
  { value: 'ignore', label: 'Nu evidenția' },
  { value: 'reduce', label: 'Marchează pentru reducere' },
  { value: 'avoid', label: 'Marchează de evitat' },
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
