import { stop, start, removeAll } from './core-internal';
import * as Render from './render-internal';

/* eslint-disable no-undef */

function button(text, onClick) {
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = text;
  buttonElement.addEventListener('click', onClick);
  return buttonElement;
}

export function initDebugTools() {
  const container = document.createElement('div');
  container.style.display = 'flex';

  /* BUTTONS */
  const stopButton = button('Stop', stop);
  container.appendChild(stopButton);

  const startButton = button('Start', start);
  container.appendChild(startButton);

  const destroyAllButton = button('Destroy All', () => {
    removeAll();
    Render.removeAll();
    // TODO: Destroy all bodies
  });
  container.appendChild(destroyAllButton);

  const toggleHitboxesButton = button('Toggle hitboxes', Render.toggleHitboxes);
  container.appendChild(toggleHitboxesButton);

  document.body.appendChild(container);
}

export function toggleHitboxes() {
  Render.toggleHitboxes();
}

export function printIDs() {
  // TODO: add button
  console.warn('printIDs not yet implemented');
}
