/* eslint-disable no-undef */

export class L1Analog {
  constructor(id) {
    this.id = id;
    this.flipped = false;
  }

  invert() {
    this.flipped = !this.flipped;
    return this;
  }

  value(gamepad) {
    value = gamepad.axes[this.id];
    return this.flipped ? value * -1 : value;
  }
}

export class L1Button {
  constructor(buttonId) {
    this.id = buttonId;
    this.reversed = false;
  }

  invert() {
    this.reverse = !this.reverse;
    return this;
  }

  isPressed(gamepad) {
    return this.reversed ? !gamepad.buttons[this.id] : gamepad.buttons[this.id];
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
