const express = require('express');
const app = express();
const server = require('http').createServer(app);

const Net = require('./net');

//SERVER SETTINGS
const port = process.env.VCAP_APP_PORT || 3000;
const url = process.env.URL || "localhost";

app.use(express.static('public'));


/* 
options
{
  network: bool
}
*/
const start = (options) => {
  server.listen(port, () => {
    if (options){
      const { network } = options;
      if (network) Net.create(server);
    }
    console.log(`Server running on: ${url}:${port}`);
  });
}

module.exports = {
    start
}
