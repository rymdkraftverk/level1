const server = require('http').createServer();
const io = require('socket.io');

let socket; 

const create = (server) => {
  socket = io(server);
  socket.on('connection', (client) => {
    client.on('event', (data) => {});
    client.on('disconnect', () => {});
  });
}

module.exports = {
  create
}
