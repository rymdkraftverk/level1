import io from 'socket.io-client';

const socket = io();
let clientId;

export function getClientId() {
  return clientId;
}

export function on(key, func) {
  socket.on(key, func);
}

export function emit(key, data) {
  socket.emit(key, data);
}

