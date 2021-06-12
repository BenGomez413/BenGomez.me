let r = 0
let g = 0
let b = 0

let rgb
let txt

const rgbContainer = document.getElementById('rgbContainer')
const rgbPreview = document.getElementById('rgbPreview')

const txtContainer = document.getElementById('txtContainer')
const txtArea = document.getElementById('txtArea')

const logTable = document.getElementById('logTable')
const logTableContainer = document.getElementById('tableContainer')

/*
 _ _ _       _    ___            _          _   
| | | | ___ | |_ / __> ___  ___ | |__ ___ _| |_ 
| | | |/ ._>| . \\__ \/ . \/ | '| / // ._> | |  
|__/_/ \___.|___/<___/\___/\_|_.|_\_\\___. |_|  
                                                
*/
function connect() {
  let ws = new WebSocket('wss:bengomez.me')
  //let ws = new WebSocket('ws:localhost:3000')
  ws.onopen = function (e) {
    ws.send('BROWSER/ALL:CONNECT')
  }

  ws.onmessage = function ({ data }) {
    if (data === 'PONG') {
      console.log('PONG')
      ws.send('PING')
    }

    const regex = /^(.+)\/(.+):(.+)/g
    let parsedData = regex.exec(data)
    regex.lastIndex = 0 //* RESET REGEX i don't really get why?
    if (regex.test(parsedData)) {
      let parsedSender = parsedData[1]
      let parsedTarget = parsedData[2]
      let parsedCommand = parsedData[3]
      createTableRow(parsedSender, parsedTarget, parsedCommand)
    }

    logTableContainer.scrollTop = logTableContainer.scrollHeight
  }

  ws.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      )
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died')
    }
    console.log(`Attempting to reconnect`)
    setTimeout(function () {
      connect()
    }, 1000)
  }

  ws.onerror = function (error) {
    console.log(`[error] ${error.message}`)
  }

  /*
           _     ___  _  _    _           
 _ _  ___ | |_  / __>| |<_> _| | ___  _ _ 
| '_>/ . || . \ \__ \| || |/ . |/ ._>| '_>
|_|  \_. ||___/ <___/|_||_|\___|\___.|_|  
     <___'                                
*/

  //Update Color Preview as Sliders are moved.
  let slidersOutputs = [
    [document.getElementById('redRange'), document.getElementById('redValue')],
    [
      document.getElementById('greenRange'),
      document.getElementById('greenValue'),
    ],
    [
      document.getElementById('blueRange'),
      document.getElementById('blueValue'),
    ],
  ]

  for (let i = 0; i < slidersOutputs.length; i++) {
    slidersOutputs[i][1].innerHTML = slidersOutputs[i][0].value

    slidersOutputs[i][0].oninput = function () {
      slidersOutputs[i][1].innerHTML = this.value
      if (i === 0) {
        r = this.value
      }
      if (i === 1) {
        g = this.value
      }
      if (i === 2) {
        b = this.value
      }
      rgbPreview.style.backgroundColor = `rgb(${r},${g},${b})`
    }
  }

  /*
 ___                                 _     
|  _> ___ ._ _ _ ._ _ _  ___ ._ _  _| | ___
| <__/ . \| ' ' || ' ' |<_> || ' |/ . |<_-<
`___/\___/|_|_|_||_|_|_|<___||_|_|\___|/__/
                                           
*/
  document.getElementById('rgbSEND').addEventListener('click', sendRGB)
  function sendRGB() {
    rgb = `rgb(${r},${g},${b})`
    ws.send(`${getSender()}/${getTarget()}:${rgb}`)
  }

  document.getElementById('txtSEND').addEventListener('click', sendTXT)
  function sendTXT() {
    txt = txtArea.value
    txt = txt.replace('\r\n', ' ').replace('\n', ' ')
    ws.send(`${getSender()}/${getTarget()}:${txt}`)
    txtArea.value = ''
  }

  /*
 ___                 _    _               
| __>_ _ ._ _  ___ _| |_ <_> ___ ._ _  ___
| _>| | || ' |/ | ' | |  | |/ . \| ' |<_-<
|_| `___||_|_|\_|_. |_|  |_|\___/|_|_|/__/
                                          
*/
  function getTimeStamp() {
    let hours = new Date()
      .getHours()
      .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    let minutes = new Date()
      .getMinutes()
      .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    let seconds = new Date()
      .getSeconds()
      .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    let timestamp = `${hours}:${minutes}.${seconds}`
    return timestamp
  }

  function getSender() {
    let sender = document.getElementById('sender').value
    return sender
  }

  function getTarget() {
    let target = document.getElementById('target').value
    return target
  }

  function createTableRow(sender, target, command) {
    rgbRegex = /rgb\(\d+,\d+,\d+\)/gm
    let color = rgbRegex.exec(command)

    //Create new teble Row
    let tr = document.createElement('TR')

    //timestamp
    let td = document.createElement('TD')
    td.className = 'timestamp'
    td.append(getTimeStamp())
    tr.append(td)

    //sender
    td = document.createElement('TD')
    td.className = 'sender'
    td.append(sender)
    tr.append(td)

    //target
    td = document.createElement('TD')
    td.className = 'target'
    td.append(target)
    tr.append(td)

    //command
    td = document.createElement('TD')
    td.className = 'command'
    td.append(command)
    tr.append(td)

    //color
    td = document.createElement('TD')
    td.className = 'table-color'
    td.style.backgroundColor = color
    tr.append(td)

    logTable.append(tr)
    logTableContainer.scrollTop = logTableContainer.scrollHeight
    console.log(`${sender}/${target}:${command}`)
  }

  //KEYBOARD LISTENER
  const keyboardElements = document.getElementsByClassName('keyboard')
  for (let i = 0; i < keyboardElements.length; i++) {
    keyboardElements[i].addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const txtCheck = /txtArea/g
        if (txtCheck.test(document.activeElement.id)) {
          e.preventDefault()
          sendTXT()
        }
        const sliderCheck = /Range/g
        if (sliderCheck.test(document.activeElement.id)) {
          sendRGB()
        }
      }
    })
  }
}
connect()
