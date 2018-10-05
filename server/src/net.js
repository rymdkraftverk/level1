const socketio = require('socket.io');

let io;
const messages = [];
let clients = [];

const on = (key, func) => {
  messages.push({ key, func });
};

const emit = (key, data) => {
  if (!io) throw new Error('level1: No network instance created');

  io.emit(key, data);
};

const broadcast = (key, data) => {
  if (!io) throw new Error('level1: No network instance created');

  io.sockets.emit(key, data);
};

const create = (server) => {
  io = socketio(server);
  io.on('connection', (client) => {
    clients.push(client.id);

    client.on('disconnect', () => {
      clients = clients.filter(c => c !== client.id);
      console.log('client disconnect, remaining: ', clients);
    });

    messages.forEach((m) => {
      client.on(m.key, m.func);
    });
  });
  return io;
};

module.exports = {
  create, on, emit, broadcast,
};
