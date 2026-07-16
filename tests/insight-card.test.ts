/**
 * @vitest-environment happy-dom
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { renderInsightCard } from '../src/content/insight-card';

describe('renderInsightCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="ingredients-panel"></section>';
  });

  it('renders findings without changing the ingredient content', () => {
    const panel = document.querySelector<HTMLElement>('#ingredients-panel')!;
    panel.append('Apă, zahăr, lecitină de soia.');

    renderInsightCard(panel, [
      {
        preferenceId: 'sugar',
        label: 'Sugar',
        preference: 'avoid',
        matchedTerm: 'zahar',
      },
    ]);

    expect(panel.textContent).toContain('Apă, zahăr, lecitină de soia.');
    expect(panel.textContent).toContain('HealthyTurtle');
    expect(panel.textContent).toContain('De evitat');
    expect(panel.textContent).toContain('„zahar”');
  });

  it('does not duplicate the card when findings are unchanged', () => {
    const panel = document.querySelector<HTMLElement>('#ingredients-panel')!;

    renderInsightCard(panel, []);
    renderInsightCard(panel, []);

    expect(document.querySelectorAll('#healthy-turtle-insights')).toHaveLength(1);
  });
});
