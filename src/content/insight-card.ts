import type { IngredientFinding } from '../rules/ingredient-analyzer';

const cardId = 'healthy-turtle-insights';

export function renderInsightCard(panel: HTMLElement, findings: IngredientFinding[]): void {
  const fingerprint = JSON.stringify(findings);
  const existingCard = document.getElementById(cardId);

  if (existingCard?.dataset.fingerprint === fingerprint) {
    return;
  }

  existingCard?.remove();

  const card = document.createElement('section');
  card.id = cardId;
  card.dataset.fingerprint = fingerprint;
  card.setAttribute('aria-live', 'polite');
  card.style.cssText = [
    'margin: 0 0 16px',
    'padding: 16px',
    'border: 1px solid #b7d8c0',
    'border-radius: 12px',
    'background: #f3fbf5',
    'color: #173a24',
    'font: inherit',
  ].join(';');

  const title = document.createElement('h2');
  title.textContent = 'HealthyTurtle';
  title.style.cssText = 'margin: 0 0 6px; font-size: 18px;';

  const summary = document.createElement('p');
  summary.style.cssText = 'margin: 0 0 12px;';

  if (findings.length === 0) {
    summary.textContent = 'Nu au fost găsite potriviri pentru preferințele tale active.';
  } else {
    summary.textContent = `${findings.length} potriviri găsite în lista de ingrediente.`;

    const list = document.createElement('ul');
    list.style.cssText = 'display: grid; gap: 8px; margin: 0; padding: 0; list-style: none;';

    for (const finding of findings) {
      const item = document.createElement('li');
      item.style.cssText = [
        'display: flex',
        'gap: 8px',
        'align-items: center',
        'padding: 8px 10px',
        'border-radius: 8px',
        `background: ${finding.preference === 'avoid' ? '#fde8e7' : '#fff4d6'}`,
      ].join(';');

      const action = document.createElement('strong');
      action.textContent = finding.preference === 'avoid' ? 'De evitat' : 'De redus';

      const detail = document.createElement('span');
      detail.textContent = `${finding.label} — termen detectat: „${finding.matchedTerm}”`;

      item.append(action, detail);
      list.append(item);
    }

    card.append(title, summary, list);
  }

  if (findings.length === 0) {
    card.append(title, summary);
  }

  const note = document.createElement('p');
  note.textContent = 'Semnalare informativă — verifică întotdeauna eticheta produsului.';
  note.style.cssText = 'margin: 12px 0 0; font-size: 12px; color: #496354;';

  card.append(note);
  panel.prepend(card);
}
