const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const AppData = require('./appdata');
let http = require('http');

const API_PORT = 3001;

const app = express();
app.use(cors());

const router = express.Router();

//Database
const dbRoute =
    'mongodb+srv://admin:admin@cluster0-ydzqo.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger('dev'));

router.get('/getData', (req, res) => {
    AppData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    AppData.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    AppData.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/putData', (req, res) => {
    let data = new AppData();

    const { user } = req.body;

    if (!user) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.user = user;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

//websocket:

// var serverPort = API_PORT;
// var webSocketPort = 3002;
//
// var server = require('http').Server(app)
//     .listen(webSocketPort, function() {
//         console.log("WebSocket listening on port %d", webSocketPort);
//     });
//
// var socketIO = require('socket.io')(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }});

//
// const server = http.createServer(app);
// var io = require('socket.io')(server);
//
// io.on('connection', function(socket) {
//     console.log('connected socket!');
//
//     socket.on('greet', function(data) {
//         console.log(data);
//         socket.emit('respond', { hello: 'Hey, Mr.Client!' });
//     });
//     socket.on('disconnect', function() {
//         console.log('Socket disconnected');
//     });
// });

// //make socket
// const io = require('socket.io')(server);
// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//         console.log('client is subscribing to timer with interval ', interval);
//         setInterval(() => {
//             client.emit('timer', new Date());
//         }, interval);
//     });});