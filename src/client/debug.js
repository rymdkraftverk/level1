import { stop, start, removeAll } from './core';
import { removeAll as removeAllSprites } from './render';

export function initDebugTools() {
  const container = document.createElement('div');
  container.style.display = "flex";

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

  document.body.appendChild(container);
}

function button(text, onClick) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click', onClick);
  return button;
}
