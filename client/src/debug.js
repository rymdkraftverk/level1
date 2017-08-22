import { stop, start, removeAll } from './core';
import { removeAll as removeAllSprites, toggleHitboxes } from './render';

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
    removeAllSprites();
  });
  container.appendChild(destroyAllButton);

  const toggleHitboxesButton = button('Toggle hitboxes', toggleHitboxes);
  container.appendChild(toggleHitboxesButton);

  document.body.appendChild(container);
}
