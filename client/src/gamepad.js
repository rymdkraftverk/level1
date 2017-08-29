/* eslint-disable no-undef */

export class L1ControllerPreset {
  constructor() {
    this.buttonAliases = {};
    this.analogAliases = {};
    this.buttonInversions = [];
    this.analogInversions = [];
  }

  invertButton(btnId) {
    this.buttonInversions.push(btnId);
    return this;
  }

  invertAnalog(analogId) {
    this.analogInversions.push(analogId);
    return this;
  }

  aliasButton(btnId, alias) {
    let aliasList = this.buttonAliases[btnId];
    if (!aliasList) {
      aliasList = [];
    }
    aliasList.push(alias);
    this.buttonAliases[btnId] = aliasList;
    return this;
  }

  aliasAnalog(analogId, alias) {
    let aliasList = this.analogAliases[analogId];
    if (!aliasList) {
      aliasList = [];
    }
    aliasList.push(alias);
    this.analogAliases[analogId] = aliasList;
    return this;
  }
}

export class L1Analog {
  constructor(id) {
    this.id = id;
    this.inverted = false;
  }

  invert() {
    this.inverted = !this.inverted;
    return this;
  }

  value(gamepad) {
    value = gamepad.axes[this.id];
    if (!value) {
      return undefined;
    }
    return this.inverted ? value * -1 : value;
  }
}

export class L1Button {
  constructor(buttonId) {
    this.id = buttonId;
    this.inverted = false;
  }

  invert() {
    this.inverted = !this.inverted;
    return this;
  }

  isPressed(gamepad) {
    const value = gamepad.buttons[this.id];
    if (!value) {
      return undefined;
    }
    return this.inverted ? !value : value;
  }
}

export class L1Controller {
  constructor(gamepad) {
    this.id = gamepad.index;

    this.analogs = gamepad.axes.reduce(
      (acc, a, i) => {
        acc[i] = new L1Analog(i);
        return acc;
      },
      {},
    );

    this.analogAliases = Object.keys(this.analogs).reduce(
      (acc, a, i) => {
        const axisNbr = Math.floor(i / 2);
        const name = `axis${axisNbr}${i % 2 === 0 ? 'x' : 'y'}`;
        acc[name] = i;
        return acc;
      },
      {},
    );

    this.buttons = gamepad.buttons.reduce(
      (acc, b, i) => {
        acc[i] = new L1Button(i);
        return acc;
      },
      {},
    );

    this.buttonAliases = Object.keys(this.buttons).reduce(
      (acc, k, i) => {
        const name = `btn${i}`;
        acc[name] = i;
        return acc;
      },
      {},
    );
  }

  hasButtonWithName(btnName) {
    const btnId = this.buttonAliases[btnName];
    if (!btnId) {
      return false;
    }
    return this.hasButton(btnId);
  }

  hasButton(btnId) {
    return this.buttons[btnId] !== undefined;
  }

  isPressed(gamepad, btnId) {
    const button = this.buttons[btnId];
    if (!button) {
      return null;
    }
    return button.isPressed(gamepad);
  }

  isPressedByName(gamePad, btnName) {
    const btnId = this.buttonAliases[btnName];
    if (!btnId) {
      return undefined;
    }
    return this.isPressed(gamepad, btnId);
  }

  aliasButton(btnId, alias) {
    if (!this.hasButton(btnId)) {
      return false;
    }
    this.aliasButton[alias] = btnId;
    return true;
  }

  hasAnalog(analogId) {
    return this.analogs[analogId] !== undefined;
  }

  hasAnalogWithName(analogName) {
    const analogId = this.analogAliases[analogName];
    if (!analogId) {
      return false;
    }
    return this.hasAnalog(analogId);
  }

  aliasAnalog(analogId, alias) {
    if (!this.hasAnalog(analogId)) {
      return false;
    }
    this.analogAliases[alias] = analogId;
    return true;
  }

  analogValue(gamepad, analogId) {
    const analog = this.analogs[analogId];
    if (!analog) {
      return undefined;
    }
    return analog.value(gamepad);
  }

  analogValueByName(gamepad, analogName) {
    const analogId = this.analogAliases[analogName];
    if (!analogId) {
      return undefined;
    }
    return this.analogValue(gamepad, analogId);
  }
}

const l1Controllers = {};

const controllers = {};
const haveEvents = 'ongamepadconnected' in window;

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function addgamepad(gamepad) {
  l1Controllers[gamepad.index] = new L1Controller(gamepad);
  controllers[gamepad.index] = gamepad;
  console.log(l1Controllers);
}

window.addEventListener('gamepadconnected', addgamepad);
window.addEventListener('gamepaddisconnected', removegamepad);

function scangamepads() {
  // eslint-disable-next-line no-nested-ternary
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (let i = 0; i < gamepads.length; i += 1) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

export function run() {
  if (!haveEvents) {
    scangamepads();
  }
}

export function isPressed(id, button) {
  if (!controllers[id]) return null;

  const val = controllers[id].buttons[button];
  let pressed = val === 1.0;

  if (typeof (val) === 'object') {
    pressed = val.pressed;
    // val = val.value;
  }
  return pressed;
}

export function axisDir(id, axis) {
  if (!controllers[id]) return null;
  return controllers[id].axes[axis];
}

export function getGamepads() {
  return controllers;
}
