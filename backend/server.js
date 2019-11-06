//Gather mongoose and express
const mongoose = require('mongoose');
const express = require('express');
//Gather cors
let cors = require('cors');
//Gather schemas
const AppData = require('./appdata');
const MessageData = require('./appmessages');
const ResearchData = require('./appresearch');
//Other
const bodyParser = require('body-parser');

//Constant declarations
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//Database connection
const dbRoute =
    'mongodb+srv://admin:admin@cluster0-ydzqo.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes to database activity for Users Schema
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

//Routes to database activity for Messages Schema
router.get('/getMessages', (req, res) => {
    MessageData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/putMessage', (req, res) => {
    let msgData = new MessageData();

    const { user, message } = req.body;

    if (!user || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    msgData.user = user;
    msgData.message = message;
    msgData.save((err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
});

//Routes to database activity for Research Schema
router.get('/getResearch', (req, res) => {
    ResearchData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/putResearch', (req, res) => {
    let researchData = new ResearchData();

    const { user, coordinates, temperature, abundance, species} = req.body;

    let count = 0;
    researchData.user = user;
    if (coordinates) {
        researchData.coordinates = coordinates;
        count++;
    }
    if (temperature) {
        researchData.temperature = temperature;
        count++;
    }
    if (abundance) {
        researchData.abundance = abundance;
        count++;
    }
    if (species) {
        researchData.species = species;
        count++;
    }
    if (count > 0) {
        researchData.save((err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    }
});


app.use('/sappo', router);

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

    socket.on('new message', (msg) => {
        console.log('New msg is: ', msg);
        io.sockets.emit('new message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // let pos = allClients.indexOf(socket);
        // allClients.splice(pos, 1);
    })
});