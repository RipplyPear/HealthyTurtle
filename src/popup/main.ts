import './style.css';

import { preferenceChoices, preferenceDefinitions, type Preferences } from '../shared/preferences';
import { loadPreferences, savePreferences } from '../shared/storage';

function getRequiredElement<ElementType extends Element>(selector: string): ElementType {
  const element = document.querySelector<ElementType>(selector);

  if (!element) {
    throw new Error(`HealthyTurtle popup is missing "${selector}".`);
  }

  return element;
}

const form = getRequiredElement<HTMLFormElement>('#preferences-form');
const preferenceList = getRequiredElement<HTMLDivElement>('#preference-list');
const status = getRequiredElement<HTMLParagraphElement>('#status');

function renderPreferences(preferences: Preferences): void {
  const fragment = document.createDocumentFragment();

  for (const definition of preferenceDefinitions) {
    const wrapper = document.createElement('label');
    wrapper.className = 'preference';

    const copy = document.createElement('span');
    copy.className = 'preference-copy';

    const label = document.createElement('strong');
    label.textContent = definition.label;

    const description = document.createElement('small');
    description.textContent = definition.description;

    copy.append(label, description);

    const select = document.createElement('select');
    select.name = definition.id;
    select.setAttribute('aria-label', `${definition.label} preference`);

    for (const choice of preferenceChoices) {
      const option = document.createElement('option');
      option.value = choice.value;
      option.textContent = choice.label;
      option.selected = preferences[definition.id] === choice.value;
      select.append(option);
    }

    wrapper.append(copy, select);
    fragment.append(wrapper);
  }

  preferenceList.replaceChildren(fragment);
}

async function initialize(): Promise<void> {
  try {
    renderPreferences(await loadPreferences());
  } catch {
    status.textContent = 'Preferences could not be loaded.';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const preferences = Object.fromEntries(formData) as Preferences;

  try {
    await savePreferences(preferences);
    status.textContent = 'Preferences saved.';
  } catch {
    status.textContent = 'Preferences could not be saved.';
  }
});

void initialize();
