var express = require('express');
var socket = require('socket.io');
var Tail = require('tail').Tail;
var http = require('http');
var os = require('os');
require('dotenv').config();

var options= {separator: /[\r]{0,1}\n/, fromBeginning: false, fsWatchOptions: {}, follow: true, logger: console, useWatchFile: true}

var tail = new Tail(process.env.CLIENT_PATH, options);
var networkInterfaces = os.networkInterfaces();
var localIP;

for (const name of Object.keys(networkInterfaces)) {
  for (const networks of networkInterfaces[name]) {
     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
     if (networks.family === 'IPv4' && !networks.internal) {
      localIP = networks.address;
      break;
    }
  }
}

var app = express();
var server = http.createServer(app);
server.listen(4000, localIP, () => {
  console.log(`link to chat: ${localIP}:4000`);
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
  console.log('socket connection', socket.id);
})

tail.on('line', (data) => {
  console.log(data);
  io.sockets.emit('newMessage', data);
})