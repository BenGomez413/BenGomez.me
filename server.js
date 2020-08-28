const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, console.log('Server running on port: ' + port));

/*commit to my computer
git status
git init
touch .gitignore 
  -> add node_modules/ to gitignore
git add .
git commit -m "stuff"


//Github repository

//Digital Ocean

*/