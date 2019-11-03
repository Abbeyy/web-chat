// var io = require('socket.io-client');
// var socket = io.connect('http://localhost:3001', {reconnect: true});
//
// // Add a connect listener
// socket.on('connect', function (socket) {
//     console.log('Connected!');
// });
// socket.emit('CH01', 'me', 'test msg');

// var socket = io('ws://localhost:3001', {transports: ['websocket']});
// socket.on('connect', function () {
//     console.log('connected!');
//     socket.emit('greet', { message: 'Hello Mr.Server!' });
// });
//
// socket.on('respond', function (data) {
//     console.log(data);
// });

// let socketConnectionOpts = {
//     forceNew: true
// }
//
// let socket = socketIO.connect('http://localhost:3002', socketConnectionOpts)