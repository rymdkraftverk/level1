import { stop, start /* , removeAll */ } from './core';
import * as Render from './render';
import * as Debug from '../debug';
import { save, restore } from './localStorage';

const TOGGLE_HITBOXES = 'toggle-hitboxes';

const idsToLoadFromLocalStorage = [
  {
    id: TOGGLE_HITBOXES,
    onRestore(restoredValue) {
      Render.showHitboxes(restoredValue);
    },
  },
];

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

  // Disable this for now since it doesn't seem useful
  // createButton('Destroy All', () => {
  //   removeAll();
  //   Render.removeAll();
  //   // TODO: Destroy all bodies
  // });

  createButton('Toggle hitboxes', () => {
    const toggled = Render.showHitboxes(!Render.getShowHitboxes());
    save(TOGGLE_HITBOXES, toggled);
  });

  createButton('Print IDs', Debug.togglePrintIDs);

  // eslint-disable-next-line no-undef
  document.body.appendChild(containerElement);

  idsToLoadFromLocalStorage.forEach(({ id, onRestore }) => {
    const restoredValue = restore(id);
    if (restoredValue !== undefined) {
      onRestore(restoredValue);
    }
  });
}

// const amountOfBodies = Composite.allBodies(composite).length;
// Entity.getAll().length;
// MainLoop.getFPS();
// getStage().children.length;
