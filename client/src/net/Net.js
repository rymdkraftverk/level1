import io from 'socket.io-client';

let socket;
let clientId;

export function start() {
  socket = io();
}

export function getClientId() {
  return clientId;
}

export function on(key, func) {
  socket.on(key, func);
}

export function emit(key, data) {
  socket.emit(key, data);
}
