const express = require('express');
const socket = require('socket.io');
const Tail = require('tail').Tail;
const http = require('http');
const os = require('os');
require('dotenv').config();

const options= {separator: /[\r]{0,1}\n/, fromBeginning: false, fsWatchOptions: {}, follow: true, logger: console, useWatchFile: true}

const tail = new Tail(process.env.CLIENT_PATH, options);
const networkInterfaces = os.networkInterfaces();
let localIP;

for (const name of Object.keys(networkInterfaces)) {
  for (const networks of networkInterfaces[name]) {
     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
     if (networks.family === 'IPv4' && !networks.internal) {
      localIP = networks.address;
      break;
    }
  }
}

const app = express();
const server = http.createServer(app);
server.listen(4000, localIP, () => {
  console.log(`link to chat: ${localIP}:4000`);
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket connection', socket.id);
})

tail.on('line', (data) => {
  console.log(data);
  io.sockets.emit('newMessage', data);
})