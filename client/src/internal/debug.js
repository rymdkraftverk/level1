/* eslint-disable no-undef */

import { Composite } from 'matter-js';
import * as Core from './core';
import * as Render from './render';
import * as Debug from '../debug';
import * as Entity from '../entity';
import { save, restore } from './localStorage';

const TIME_BETWEEN_INFO_UPDATES = 1000;

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
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = text;
  buttonElement.addEventListener('click', onClick);
  return buttonElement;
}

function flexDiv() {
  const containerElement = document.createElement('div');
  containerElement.style.display = 'flex';
  return containerElement;
}

const makeCreateInfoRow = (container) => (label, getData) => {
  const row1 = flexDiv();
  container.appendChild(row1);

  setInterval(() => {
    row1.textContent = `${label}${getData()}`;
  }, TIME_BETWEEN_INFO_UPDATES);
};

const makeCreateButton = (container) => (text, onClick) => {
  const b = button(text, onClick);
  container.appendChild(b);
};

export function initDebugTools() {
  const selectionContainer = flexDiv();
  const createButton = makeCreateButton(selectionContainer);

  /* BUTTONS */
  createButton('Stop', Core.stop);

  createButton('Start', Core.start);

  createButton('Toggle hitboxes', () => {
    const toggled = Render.showHitboxes(!Render.getShowHitboxes());
    save(TOGGLE_HITBOXES, toggled);
  });

  createButton('Print IDs', Debug.togglePrintIDs);

  const infoContainer = document.createElement('div');
  const createInfoRow = makeCreateInfoRow(infoContainer);

  createInfoRow('fps: ', getFPS);
  createInfoRow('entities: ', getAllEntities);
  createInfoRow('sprites:', getAllSprites);
  if (Core.isPhysicsEnabled()) {
    createInfoRow('bodies:', getAllBodies);
  }

  document.body.appendChild(selectionContainer);
  document.body.appendChild(infoContainer);

  idsToLoadFromLocalStorage.forEach(({ id, onRestore }) => {
    const restoredValue = restore(id);
    if (restoredValue !== undefined) {
      onRestore(restoredValue);
    }
  });
}

function getFPS() {
  return Math.round(Core.getFPS());
}
function getAllEntities() {
  return Entity.getAll().length;
}
function getAllSprites() {
  // Remove 2 children that are Graphics objects added to the game by level1
  return Render.getStage() && Math.max(Render.getStage().children.length - 2, 0);
}
function getAllBodies() {
  return Composite.allBodies(Core.getPhysicsEngine().world).length;
}
