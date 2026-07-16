import { findFreshfulIngredientSection } from '../adapters/freshful';
import { renderInsightCard } from './insight-card';
import { analyzeIngredients } from '../rules/ingredient-analyzer';
import { loadPreferences } from '../shared/storage';

const cardId = 'healthy-turtle-insights';
let refreshScheduled = false;

async function refreshInsights(): Promise<void> {
  const ingredientSection = findFreshfulIngredientSection(document);

  if (!ingredientSection) {
    return;
  }

  try {
    const preferences = await loadPreferences();
    const findings = analyzeIngredients(ingredientSection.text, preferences);

    renderInsightCard(ingredientSection.panel, findings);
    document.documentElement.dataset.healthyTurtle = 'ready';
    document.documentElement.dataset.healthyTurtleFindings = String(findings.length);
  } catch {
    document.documentElement.dataset.healthyTurtle = 'error';
  }
}

function scheduleRefresh(): void {
  if (refreshScheduled) {
    return;
  }

  refreshScheduled = true;

  window.setTimeout(() => {
    refreshScheduled = false;
    void refreshInsights();
  }, 100);
}

const observer = new MutationObserver((mutations) => {
  const hasPageChange = mutations.some((mutation) =>
    Array.from(mutation.addedNodes).some(
      (node) => !(node instanceof HTMLElement && node.closest(`#${cardId}`) !== null),
    ),
  );

  if (hasPageChange) {
    scheduleRefresh();
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

chrome.storage.onChanged.addListener((_changes, areaName) => {
  if (areaName === 'sync') {
    scheduleRefresh();
  }
});

scheduleRefresh();
