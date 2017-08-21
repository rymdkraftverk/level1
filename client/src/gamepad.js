/* eslint-disable no-undef */

const controllers = {};
const haveEvents = 'ongamepadconnected' in window;

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
}

window.addEventListener('gamepadconnected', addgamepad);
window.addEventListener('gamepaddisconnected', removegamepad);

export function run() {
  if (!haveEvents) {
    scangamepads();
  }
}

export function isPressed(id, button) {
  if (!controllers[id]) return;

  const val = controllers[id].buttons[button];
  let pressed = val === 1.0;

  if (typeof (val) === 'object') {
    pressed = val.pressed;
    // val = val.value;
  }
  return pressed;
}

export function axisDir(id, axis) {
  if (!controllers[id]) return;
  return controllers[id].axes[axis];
}

export function getGamepads() {
  return controllers;
}

function scangamepads() {
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
