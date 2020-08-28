"use strict";

var express = require('express');

var app = express();
var port = 3000;

var path = require('path');

app.use(express["static"](path.join(__dirname, 'public')));
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