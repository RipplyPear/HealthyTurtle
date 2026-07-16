import { normalizeIngredientText } from '../rules/normalize';

export type FreshfulIngredientSection = {
  panel: HTMLElement;
  text: string;
};

function textContentOf(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

export function findFreshfulIngredientSection(
  document: Document,
): FreshfulIngredientSection | null {
  const ingredientsTab = Array.from(document.querySelectorAll<HTMLElement>('[role="tab"]')).find(
    (tab) => normalizeIngredientText(textContentOf(tab)) === 'ingrediente',
  );

  const panelId = ingredientsTab?.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;

  if (!panel || panel.getAttribute('role') !== 'tabpanel') {
    return null;
  }

  const ingredientsHeading = Array.from(
    panel.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'),
  ).find((heading) => normalizeIngredientText(textContentOf(heading)) === 'ingrediente');

  const text = textContentOf(ingredientsHeading?.nextElementSibling ?? null);

  return text === '' ? null : { panel, text };
}
