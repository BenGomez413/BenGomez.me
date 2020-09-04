const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const fs = require('fs');

app.get("*/getJSON", function (req, res) {
  let rawdata = fs.readFileSync('public/ArduinoWebController/arduino.json');
  let info = JSON.parse(rawdata);
  //console.log(info);  
  res.json(info);
});


//Save updated JSON
app.use(express.json({
  limit: '1mb'
}));
app.post('*/updateJSON', (req, res) => {
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













app.listen(port, console.log('Server running on port: ' + port));

/*commit to my computer
git status
git init
touch .gitignore 
  -> add node_modules/ to gitignore
git add .
git commit -m "message"


//Github repository

//Digital Ocean

*/

//connect node app to database(mongoDB)
//create a request route 
//app.post('/saveRGB');