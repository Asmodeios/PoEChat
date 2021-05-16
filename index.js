var express = require('express');
var socket = require('socket.io');
var Tail = require('tail').Tail;
var http = require('http');
require('dotenv').config();


var tail = new Tail(process.env.CLIENT_PATH);


var app = express();
var server = http.createServer(app);
server.listen(4000, process.env.IP, () => {
  console.log('listening to requests on port 4000');
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