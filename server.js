const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));






const fs = require('fs');

app.get("/getRGB", function (req, res) {
  let rawdata = fs.readFileSync('public/ArduinoWebController/arduino.json');
  let info = JSON.parse(rawdata);
  //console.log(info);  
  res.json(info);
});



app.put("/updateJSON", function (req, res) {
  console.log('req:' + req);
  
  // fs.writeFileSync('public/ArduinoWebController/arduino.json', req);
  // console.log("File written successfully\n");
  // console.log("The written has the following contents:");
  // console.log(fs.readFileSync("programming.txt", "utf8"));
})














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