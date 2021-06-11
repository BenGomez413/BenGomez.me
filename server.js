const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const { client } = require('websocket')
app.use(express.static(path.join(__dirname, 'public')))
const server = require('http').createServer(app)

//WEBSOCKET
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server: server })
webSockets = []

let parsedData = 'SERVER/ALL:DEFAULT'
let parsedSender = 'SERVER'
let parsedTarget = 'ALL'
let parsedCommand = 'DEFAULT'

wss.on('connection', (ws, req) => {
  ws.on('message', function incoming(message) {
    console.log(req.socket.remoteAddress, message)
    //check if message is in the Format Sender/Target:Command
    let regex = /^(.+)\/(.+):(.+)$/gi

    //Verify Format
    if (regex.test(message)) {
      regex.lastIndex = 0 //* RESET REGEX i don't really get why?
      parsedData = regex.exec(message)

      parsedSender = parsedData[1]
      parsedTarget = parsedData[2]
      parsedCommand = parsedData[3]
    } else {
      //if it doesn't match don't try and parse and send this as an error
      parsedSender = 'SEVER'
      parsedTarget = 'ALL'
      parsedCommand = 'BAD FORMAT'
    }

    const rgbRegex = /rgb\(\d+,\d+,\d+\)/g

    //CLIENT NEED TO SEND A CONNECT MESSAGE TO BE ADDED TO THE webSockets ARRAY
    if (parsedCommand === 'CONNECT') {
      let unique = true
      for (let i = 0; i < webSockets.length; i++) {
        if (req.socket.remoteAddress == webSockets[i].id[1]) {
          unique = false
        }
      }
      if (unique === true) {
        webSockets.push({ id: parsedSender, socketInfo: ws })
      }
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`${parsedSender}/ALL:CONNECTED`)
        }
      })
      //console.log(webSockets.map((obj) => obj.id[0]))

      //If message contains rgb
    } else if (rgbRegex.test(parsedCommand)) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          //Locate arduino socket so we can send special format to just it
          let mkr1010Socket = webSockets.find((obj) => obj.id === 'MKR1010')
          if (client === mkr1010Socket.socketInfo) {
            const num = /\d+/g
            let rgbArray
            client.send('rgb')
            while ((rgbArray = num.exec(parsedCommand)) !== null) {
              client.send(rgbArray[0])
            }
          }
          //send the message normally to everything else
          client.send(message)
        }
      })
    } else {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    }
  })

  wss.on('close', function () {
    console.log('Client Disconected:', req.socket.remoteAddress)
    ws = null
  })
})

//----------Keep at end of file-----------//
server.listen(port, console.log('Server running on port: ' + port))
