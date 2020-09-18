const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const mongoose = require('mongoose');
require("dotenv/config");
const Microcontroller = require('./model/microcontroller');


//POST new JSON to MongoDB--------------------------------
app.post("/postNewMicrocontroller", async (req, res) => {
  try {
    const newMicrocontroller = new Microcontroller(req.body);
    await newMicrocontroller.save();
    //console.log("Posted New Microcontroller");
    res.status(200);
    res.send(newMicrocontroller);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});


//GET JSON to MongoDB--------------------------------
app.post('/getMicrocontrollerData', async (req, res) => {
  try {
    console.log("Got data for:", req.body.name);
    res.status(200);
    res.send(await Microcontroller.find({
      name: req.body.name
    }).exec());
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});


//UPDATE JSON to MongoDB--------------------------------
app.put('/updateMongoDB', async (req, res) => {
  try {
    const filter = {
      name: 'MKR1010'
    };
    const update = req.body;

    console.log(req.body);

    let doc = await Microcontroller.findOneAndUpdate(filter, update, {
      new: true
    });
    res.send(doc);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
})



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


app.listen(port, console.log('Server running on port: ' + port));