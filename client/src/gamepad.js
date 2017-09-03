/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

export class L1ControllerPreset {
  constructor() {
    this.buttonAliases = new Map();
    this.analogAliases = new Map();
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
    if (aliasList === undefined) {
      aliasList = [];
    }
    aliasList.push(alias);
    this.buttonAliases.set(btnId, aliasList);
    return this;
  }

  aliasAnalog(analogId, alias) {
    let aliasList = this.analogAliases[analogId];
    if (aliasList === undefined) {
      aliasList = [];
    }
    aliasList.push(alias);
    this.analogAliases.set(analogId, aliasList);
    return this;
  }

  // Should maybe deep copy l1gamepad
  configure(l1gamepad) {
    this.buttonAliases.forEach((aliases, i) => {
      aliases.forEach((alias) => {
        l1gamepad.aliasButton(i, alias);
      });
    });

    this.analogAliases.forEach((aliases, i) => {
      aliases.forEach((alias) => {
        l1gamepad.analogAliases(i, alias);
      });
    });

    this.buttonInversions.forEach((btnId) => {
      l1gamepad.invertButton(btnId);
    });

    this.analogInversions.forEach((analogId) => {
      l1gamepad.invertAnalog(analogId);
    });

    return l1gamepad;
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
    const value = gamepad.axes[this.id];
    if (value === undefined) {
      return 0;
    }
    const v = this.inverted ? (value * -1) : value;
    return v;
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
    if (value === undefined) {
      return false;
    }
    return this.inverted ? !value.pressed : value.pressed;
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

  hasButtonWithAlias(btnAlias) {
    const btnId = this.buttonAliases[btnAlias];
    if (btnId === undefined) {
      return false;
    }
    return this.hasButton(btnId);
  }

  hasButton(btnId) {
    if (typeof btnId === 'string') {
      return this.hasButtonWithAlias(btnId);
    }
    return this.buttons[btnId] !== undefined;
  }

  isPressed(gamepad, btnId) {
    if (typeof btnId === 'string') {
      return this.isPressedByAlias(gamepad, btnId);
    }

    const button = this.buttons[btnId];
    if (button === undefined) {
      return false;
    }
    return button.isPressed(gamepad);
  }

  isPressedByAlias(gamepad, btnAlias) {
    const btnId = this.buttonAliases[btnAlias];
    if (btnId === undefined) {
      return undefined;
    }
    return this.isPressed(gamepad, btnId);
  }

  aliasButton(btnId, alias) {
    if (!this.hasButton(btnId)) {
      return false;
    }
    this.buttonAliases[alias] = btnId;
    return true;
  }

  hasAnalog(analogId) {
    if (typeof analogId === 'string') {
      return this.hasAnalogWithAlias(analogId);
    }
    return this.analogs[analogId] !== undefined;
  }

  hasAnalogWithAlias(analogAlias) {
    const analogId = this.analogAliases[analogAlias];
    if (analogId === undefined) {
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
    if (typeof analogId === 'string') {
      return this.analogValueByAlias(gamepad, analogId);
    }

    const analog = this.analogs[analogId];
    if (analog === undefined) {
      return 0;
    }
    return analog.value(gamepad);
  }

  analogValueByAlias(gamepad, analogAlias) {
    const analogId = this.analogAliases[analogAlias];
    if (analogId === undefined) {
      return undefined;
    }
    return this.analogValue(gamepad, analogId);
  }

  invertAnalog(analogId) {
    const analog = this.analogs[analogId];
    if (analog !== undefined) {
      analog.invert();
    }
  }

  invertButton(btnId) {
    const button = this.buttons[btnId];
    if (button !== undefined) {
      button.invert();
    }
  }
}

const l1Controllers = {};


const controllers = {};
const haveEvents = 'ongamepadconnected' in window;

let l1Presets = {
  'MY-POWER CO.,LTD. USB Joystick (Vendor: 0e8f Product: 310d)': new L1ControllerPreset().aliasButton(0, 'y'),
};

export function addPreset(typeId, controllerPreset) {
  l1Presets = {
    ...l1Presets,
    typeId: controllerPreset,
  };
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function addgamepad(gamepad) {
  let controller = new L1Controller(gamepad);
  const preset = l1Presets[gamepad.id];

  if (preset) {
    controller = preset.configure(controller);
  }

  l1Controllers[gamepad.index] = controller;
  controllers[gamepad.index] = gamepad;
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
  return l1Controllers[id].isPressed(controllers[id], button);
}

export function axisDir(id, axis) {
  if (!controllers[id]) return null;
  return l1Controllers[id].analogValue(controllers[id], axis);
}

export function getGamepads() {
  return controllers;
}
