import { stop, start, removeAll } from './core-internal';
import * as Render from './render-internal';

/* eslint-disable no-undef */

function button(text, onClick) {
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = text;
  buttonElement.addEventListener('click', onClick);
  return buttonElement;
}

export function togglePrintIDs() {
  // TODO: add button
  console.warn('printIDs not yet implemented');
}

export function initDebugTools() {
  const containerElement = document.createElement('div');
  containerElement.style.display = 'flex';
  const makeCreateButton = (container) => (text, onClick) => {
    const b = button(text, onClick);
    container.appendChild(b);
  };
  const createButton = makeCreateButton(containerElement);

  /* BUTTONS */
  createButton('Stop', stop);

  createButton('Start', start);

  createButton('Destroy All', () => {
    removeAll();
    Render.removeAll();
    // TODO: Destroy all bodies
  });

  createButton('Toggle hitboxes', Render.toggleHitboxes);

  createButton('Print IDs', togglePrintIDs);

  document.body.appendChild(containerElement);
}

export function toggleHitboxes() {
  Render.toggleHitboxes();
}
