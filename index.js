var express = require('express');
var socket = require('socket.io');
var Tail = require('tail').Tail;
var http = require('http');
const path = ""
var tail = new Tail("C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt");



var app = express();
var server = http.createServer(app);
server.listen(4000, '192.168.0.192', () => {
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