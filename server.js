const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//WEBSOCKET
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });

wss.on('connection', (ws, req) => {
  if(req.socket.remoteAddress === '::ffff:192.168.1.240'){
    console.log('MKR 1010 connected ' + req.socket.remoteAddress);
  } else {
    ws.send('CONNECTED!');
    console.log('Browser Connected');
  }
  

  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        const regex = /^rgb\(\d+,\d+,\d+\)$/;      //check if rgb(225,255,255)
                 
        if(regex.test(message)) {
          const num = /\d+/g;
          let rgbArray;

          client.send('rgb');
          while ((rgbArray = num.exec(message)) !== null) {
            client.send(rgbArray[0]);
          }

        console.log(req.socket.remoteAddress, message);
        } else {
          client.send(message);
          console.log(message);
        }
      }
    });
  });

});


//----------Keep at end of file-----------//
server.listen(port, console.log('Server running on port: ' + port));