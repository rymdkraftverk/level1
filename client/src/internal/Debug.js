import { Composite } from 'matter-js';
import * as Core from './Core';
import * as Render from './Render';
import { save, restore } from './localStorage';
import getAllEntities from '../next/entityUtil/getAllEntities';

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
  const buttonElement = document.createElement('div');
  buttonElement.innerHTML = text;
  const { style } = buttonElement;
  style.padding = '8px 16px';
  style.margin = 'auto 16px';
  style.boxShadow = '2px 2px 1px black';
  style.borderRadius = '4px';
  style.cursor = 'pointer';
  style.fontWeight = 'bold';
  style.fontSize = '8pt';
  style.backgroundColor = 'white';
  style.textAlign = 'center';
  style.userSelect = 'none';

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
  const update = () => {
    row1.textContent = `${label}${getData()}`;
  };
  update();
  setInterval(update, TIME_BETWEEN_INFO_UPDATES);
};

const makeCreateButton = (container) => (text, onClick) => {
  const b = button(text, onClick);
  container.appendChild(b);
};

const createRunningInfo = (container) => {
  const runningInfo = document.createElement('p');
  runningInfo.style.padding = '0 16px';
  container.appendChild(runningInfo);
  const update = () => {
    const isRunning = Core.isRunning();
    runningInfo.textContent = `${isRunning ? 'Running' : 'Stopped'}`;
    runningInfo.style.color = `${isRunning ? 'green' : 'red'}`;
  };
  update();
  setInterval(update, TIME_BETWEEN_INFO_UPDATES);
};

export function initDebugTools() {
  const selectionContainer = flexDiv();
  const createButton = makeCreateButton(selectionContainer);

  createRunningInfo(selectionContainer);

  /* BUTTONS */
  createButton('stop', ({ target }) => {
    if (!Core.isRunning()) {
      Core.start();
      target.innerHTML = 'stop';
    } else {
      Core.stop();
      target.innerHTML = 'start';
    }
  });

  createButton('Toggle hitboxes', () => {
    const toggled = Render.showHitboxes(!Render.getShowHitboxes());
    save(TOGGLE_HITBOXES, toggled);
  });

  // Disable until implemented
  // createButton('Print IDs', Debug.togglePrintIDs);

  const infoContainer = document.createElement('div');
  infoContainer.style.color = 'white';
  infoContainer.style.padding = '24px';
  infoContainer.style.width = '300px';
  infoContainer.style.backgroundColor = 'black';

  const createInfoRow = makeCreateInfoRow(infoContainer);

  createInfoRow('fps: ', getFPS);
  createInfoRow('entities: ', getAmountOfEntities);
  createInfoRow('sprites: ', getAllSprites);
  if (Core.isPhysicsEnabled()) {
    createInfoRow('bodies: ', getAllBodies);
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
function getAmountOfEntities() {
  return getAllEntities().length;
}
function getAllSprites() {
  // Remove 2 children that are Graphics objects added to the game by level1
  return Render.getStage() && Math.max(Render.getStage().children.length - 2, 0);
}
function getAllBodies() {
  return Composite.allBodies(Core.getPhysicsEngine().world).length;
}
