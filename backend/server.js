const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const AppData = require('./appdata');

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
let http = require('http');
const server = new http.Server(app);

//websocket:
const socketIO = require('socket.io');
const io = socketIO(server);

server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// let allClients = [];
io.on('connection', socket => {
    // allClients.push(socket);
    console.log('New client connected');

    socket.on('change colour', (color) => {
        console.log('Color Changed to: ', color);
        io.sockets.emit('change color', color);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // let pos = allClients.indexOf(socket);
        // allClients.splice(pos, 1);
    })
});