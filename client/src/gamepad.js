const controllers = {};
let haveEvents = 'ongamepadconnected' in window;

window.addEventListener("gamepadconnected", addgamepad);
window.addEventListener("gamepaddisconnected", removegamepad);

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
}

export function run(){
  if (!haveEvents) {
    scangamepads();
  }
}

export function isPressed(id, button){
  if (!controllers[id]) return;

  const val = controllers[id].buttons[button];
  let pressed = val == 1.0;

  if (typeof(val) == "object") {
    pressed = val.pressed;
    // val = val.value;
  }
  return pressed;
}

export function axisDir(id, axis){
  if (!controllers[id]) return;
  return controllers[id].axes[axis];
}

export function getGamepads() {
  return controllers;
}

function scangamepads() {
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}
