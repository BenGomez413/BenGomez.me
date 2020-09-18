const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({
  limit: '1mb'
}));

const mongoose = require('mongoose');
require("dotenv/config");
const Microcontroller = require('./model/microcontroller');
const {
  response
} = require('express');






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
    const filter = {name: 'MKR1010'};
    const update = req.body;

    console.log(req.body);
    
    let doc = await Microcontroller.findOneAndUpdate(filter, update, {new: true});
    res.send(doc);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
})
//---------------------------------------------------









app.get("/getJSON", function (req, res) {
  let rawdata = fs.readFileSync('public/ArduinoWebController/arduino.json');
  let info = JSON.parse(rawdata);
  //console.log(info);  
  res.json(info);
});

//POST updated JSON
app.post('/updateJSON', (req, res) => {
  console.log(' *UPDATE requested');
  //console.log(req.body);
  let requestString = JSON.stringify(req.body, null, 2);
  console.log(requestString);
  fs.writeFileSync('public/ArduinoWebController/arduino.json', requestString, function (err) {
    if (err) throw err;
  });
  console.log('  UPDATED!\n');
  res.end();
});

//keep at end of file
mongoose.connect(
  process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  },
  (req, res) => {
    console.log('Connected to Mongo Database!')
  })


app.listen(port, console.log('Server running on port: ' + port));