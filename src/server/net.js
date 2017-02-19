const server = require('http').createServer();
const io = require('socket.io');

let socket, client;
let messages = [];
let clients = [];

const on = (key, cb) => {
  messages.push({key, cb});
}

const emit = (key, data) => {
  if (!socket) throw new Error('Error: No network instance created');
  
  socket.emit(key, data);
}

const broadcast = (key, data) => {
  if (!socket) throw new Error('Error: No network instance created');
  
  socket.broadcast.emit(key, data);
}

const create = (server) => {
  socket = io(server);
  socket.on('connection', (client) => {
    clients.push(client.id);
    
    client.on('disconnect', function() {
      const socket = this;
      clients = clients.filter(c => c !== socket.id)
    });

    messages.forEach(m => {
      client.on(m.key, m.cb);
    });
  });
  return socket;
}

module.exports = {
  create, on, emit, broadcast
}
