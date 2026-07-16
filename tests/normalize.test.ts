import { describe, expect, it } from 'vitest';

import { normalizeIngredientText } from '../src/rules/normalize';

describe('normalizeIngredientText', () => {
  it('normalizes Romanian diacritics, case, and punctuation', () => {
    expect(normalizeIngredientText('Zahăr, SĂRURI!')).toBe('zahar saruri');
  });

  it('collapses repeated separators', () => {
    expect(normalizeIngredientText('lapte---praf')).toBe('lapte praf');
  });
});
