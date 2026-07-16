import type { PreferenceId, PreferenceValue, Preferences } from '../shared/preferences';
import { getPreferenceDefinition } from '../shared/preferences';
import { normalizeIngredientText, tokenizeIngredientText } from './normalize';

interface IngredientRule {
  preferenceId: PreferenceId;
  terms: readonly string[];
  excludedPhrases?: readonly string[];
}

export interface IngredientFinding {
  preferenceId: PreferenceId;
  label: string;
  preference: Exclude<PreferenceValue, 'ignore'>;
  matchedTerm: string;
}

const ingredientRules: readonly IngredientRule[] = [
  {
    preferenceId: 'salt',
    terms: ['sare', 'saruri'],
  },
  {
    preferenceId: 'sugar',
    terms: ['zahar', 'zaharuri', 'sirop de glucoza', 'sirop de fructoza'],
  },
  {
    preferenceId: 'gluten',
    terms: ['gluten'],
    excludedPhrases: ['fara gluten'],
  },
  {
    preferenceId: 'lactose',
    terms: ['lactoza'],
    excludedPhrases: ['fara lactoza'],
  },
  {
    preferenceId: 'eggs',
    terms: ['ou', 'oua', 'albus', 'galbenus'],
  },
  {
    preferenceId: 'fish',
    terms: ['peste'],
  },
  {
    preferenceId: 'soy',
    terms: ['soia', 'lecitina de soia'],
  },
  {
    preferenceId: 'nuts',
    terms: ['nuci', 'alune', 'migdale', 'arahide', 'fistic', 'caju'],
  },
];

function containsPhrase(tokens: readonly string[], phrase: string): boolean {
  const phraseTokens = tokenizeIngredientText(phrase);

  if (phraseTokens.length === 0 || phraseTokens.length > tokens.length) {
    return false;
  }

  return tokens.some((_, startIndex) =>
    phraseTokens.every((token, offset) => tokens[startIndex + offset] === token),
  );
}

export function analyzeIngredients(
  ingredientText: string,
  preferences: Preferences,
): IngredientFinding[] {
  const tokens = tokenizeIngredientText(ingredientText);

  return ingredientRules.flatMap((rule) => {
    const preference = preferences[rule.preferenceId];

    if (preference === 'ignore') {
      return [];
    }

    if (rule.excludedPhrases?.some((phrase) => containsPhrase(tokens, phrase))) {
      return [];
    }

    const matchedTerm = [...rule.terms]
      .sort((left, right) => right.length - left.length)
      .find((term) => containsPhrase(tokens, term));

    return matchedTerm
      ? [
          {
            preferenceId: rule.preferenceId,
            label: getPreferenceDefinition(rule.preferenceId).label,
            preference,
            matchedTerm: normalizeIngredientText(matchedTerm),
          },
        ]
      : [];
  });
}
