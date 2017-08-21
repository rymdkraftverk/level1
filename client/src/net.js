import io from 'socket.io-client';

const socket = io();
let clientId;

export function getClientId() {
  return clientId;
}

export function on(message, cb) {
  socket.on(message, cb);
}

export function emit(message, data) {
  socket.emit(message, data);
}

