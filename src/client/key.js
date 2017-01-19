import Mousetrap from 'mousetrap';

const pressed = {};

export function add(key){
  Mousetrap.bind(key, ()=>{
    onKeyDown(key);
  }, 'keydown');
  Mousetrap.bind(key, ()=> {
    onKeyUp(key);
  }, 'keyup');
}

export function isDown(keyCode){
  return pressed[keyCode];
}

function onKeyDown(event){
  pressed[event] = true;
}

function onKeyUp(event){
  pressed[event] = false;
}
