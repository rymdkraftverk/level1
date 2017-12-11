import { stop, start, removeAll } from './core';
import * as Render from './render';
import * as Debug from '../debug';

function button(text, onClick) {
  // eslint-disable-next-line no-undef
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = text;
  buttonElement.addEventListener('click', onClick);
  return buttonElement;
}

export function initDebugTools() {
  // eslint-disable-next-line no-undef
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

  createButton('Toggle hitboxes', Debug.toggleHitboxes);

  createButton('Print IDs', Debug.togglePrintIDs);

  // eslint-disable-next-line no-undef
  document.body.appendChild(containerElement);
}
