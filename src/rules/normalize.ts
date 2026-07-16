export function normalizeIngredientText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('ro-RO')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function tokenizeIngredientText(value: string): string[] {
  const normalized = normalizeIngredientText(value);

  return normalized === '' ? [] : normalized.split(' ');
}
