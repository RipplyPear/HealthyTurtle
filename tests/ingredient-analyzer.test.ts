import { describe, expect, it } from 'vitest';

import { analyzeIngredients } from '../src/rules/ingredient-analyzer';
import { defaultPreferences, type Preferences } from '../src/shared/preferences';

function withPreferences(overrides: Partial<Preferences>): Preferences {
  return { ...defaultPreferences, ...overrides };
}

describe('analyzeIngredients', () => {
  it('finds enabled preferences and explains the matched terms', () => {
    const findings = analyzeIngredients(
      'Apă, zahăr, sare și lecitină de soia.',
      withPreferences({ salt: 'reduce', sugar: 'avoid', soy: 'avoid' }),
    );

    expect(findings).toEqual([
      {
        preferenceId: 'salt',
        label: 'Sare',
        preference: 'reduce',
        matchedTerm: 'sare',
      },
      {
        preferenceId: 'sugar',
        label: 'Zahăr',
        preference: 'avoid',
        matchedTerm: 'zahar',
      },
      {
        preferenceId: 'soy',
        label: 'Soia',
        preference: 'avoid',
        matchedTerm: 'lecitina de soia',
      },
    ]);
  });

  it('does not report ignored preferences', () => {
    const findings = analyzeIngredients(
      'Zahăr și sare.',
      withPreferences({ sugar: 'ignore', salt: 'ignore' }),
    );

    expect(findings).toEqual([]);
  });

  it('avoids known false positives and explicit free-from claims', () => {
    const findings = analyzeIngredients(
      'Ulei cu acid oleic, băutură fără lactoză, produs fără gluten și zaharină.',
      withPreferences({ gluten: 'avoid', lactose: 'avoid', nuts: 'avoid', sugar: 'avoid' }),
    );

    expect(findings).toEqual([]);
  });

  it('recognizes Romanian diacritics in egg and fish terms', () => {
    const findings = analyzeIngredients(
      'Conține gălbenuș și pește.',
      withPreferences({ eggs: 'avoid', fish: 'reduce' }),
    );

    expect(findings).toEqual([
      {
        preferenceId: 'eggs',
        label: 'Ouă',
        preference: 'avoid',
        matchedTerm: 'galbenus',
      },
      {
        preferenceId: 'fish',
        label: 'Pește',
        preference: 'reduce',
        matchedTerm: 'peste',
      },
    ]);
  });
});
