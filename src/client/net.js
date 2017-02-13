import io from 'socket.io-client';

let socket, clientId;

export function getClientId(){
  return clientId;
}

export function on(message, cb){
  socket.on(message, cb);
}

export function emit(message, data){
  socket.emit(message, data);
}

export const create = () => {
  socket = io();
};
