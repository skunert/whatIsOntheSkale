const express = require('express')
const app = express()

let log = []

app.get('/log', function (req, res) {
  res.send("Logs: </br>" + log.join("</br>"))
})

app.get('/env', function (req, res) {
  res.send('My Env:' + JSON.stringify(process.env))
})

app.get('/', function (req, res) {
  res.send('Hello Node!')
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})

// HACK: No logs, get logs from worker into an array
process.on('message', function(message) {
  if (message.cmd && message.cmd === 'log') {
    log.push(message.message)
    console.log("[LOG] added log to central log")
  }
})
