const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({
  limit: '1mb'
}));


app.get("/getJSON", function (req, res) {
  let rawdata = fs.readFileSync('public/ArduinoWebController/arduino.json');
  let info = JSON.parse(rawdata);
  //console.log(info);  
  res.json(info);
});


//Save updated JSON
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
app.listen(port, console.log('Server running on port: ' + port));

