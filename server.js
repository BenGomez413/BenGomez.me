const express = require('express');
const app = express();
const port = 3000;


//WEBSOCKET
const server = require('http').createServer(app);
const WebSocket = require('ws');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Message recieved: ' + message);
  });
});


app.use(express.json());
//MONGOOSE
const mongoose = require('mongoose');
require("dotenv/config");
const Device = require('./model/device');

//POST new JSON to MongoDB--------------------------------
app.post("/postNewDevice", async (req, res) => {
  try {
    console.log("POST New Device");
    const newDevice = new Device(req.body);
    await newDevice.save();
    //console.log("Posted New Device");
    res.status(200);
    res.send(newDevice);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});


//GET JSON to MongoDB--------------------------------
app.get('/getInfo', async function(req, res) {
  let device = req.query.device;
  try{
    console.log("GET info for:", device);
    res.status(200);
    res.send(await Device.find({
      name: device
    }).exec());
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});


//UPDATE JSON to MongoDB--------------------------------
app.put('/updateMongoDB', async (req, res) => {
  try {
    console.log("PUT Device");
    const filter = {
      name: 'MKR1010'
    };
    const update = req.body;

    console.log(req.body);

    let doc = await Device.findOneAndUpdate(filter, update, {
      new: true
    });
    res.send(doc);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});





//----------Keep at end of file-----------//
mongoose.connect(
  process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  },
  (req, res) => {
    console.log('Connected to Mongo Database!');
  })


server.listen(port, console.log('Server running on port: ' + port));