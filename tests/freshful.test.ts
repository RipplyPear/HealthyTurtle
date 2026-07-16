/**
 * @vitest-environment happy-dom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { findFreshfulIngredientSection } from '../src/adapters/freshful';

describe('findFreshfulIngredientSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('follows the ARIA tab-to-panel relationship and returns only ingredients', () => {
    document.body.innerHTML = `
      <div role="tablist">
        <button role="tab" aria-controls="details-panel">Informatii</button>
        <button role="tab" aria-controls="ingredients-panel">Ingrediente</button>
      </div>

      <section id="details-panel" role="tabpanel">
        <h2>Descriere</h2>
        <div>O băutură răcoritoare.</div>
      </section>

      <section id="ingredients-panel" role="tabpanel">
        <div>
          <h2>Ingrediente</h2>
          <div>Apă, zahăr, lecitină de soia.</div>
        </div>
        <div>
          <h2>Conținut caloric</h2>
          <div>Zaharuri: 10 g</div>
        </div>
      </section>
    `;

    const result = findFreshfulIngredientSection(document);

    expect(result?.panel.id).toBe('ingredients-panel');
    expect(result?.text).toBe('Apă, zahăr, lecitină de soia.');
  });

  it('returns null when the ingredients panel is unavailable', () => {
    document.body.innerHTML = `
      <button role="tab" aria-controls="details-panel">Informatii</button>
      <section id="details-panel" role="tabpanel">
        <h2>Descriere</h2>
        <div>Fără ingredient list.</div>
      </section>
    `;

    expect(findFreshfulIngredientSection(document)).toBeNull();
  });
});
