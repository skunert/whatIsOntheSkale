const express = require('express')

const app = express()

const MAX_LENGTH = 100
let log = []
let develcoMessages = []

// HACK: IPC using messages between worker and web-app
process.on('message', function(message) {
  function appendWithMaxLength(array, element) {
    array.push(element)
    while(array.length > MAX_LENGTH) array.shift();
  }

  if (message.cmd && message.cmd === 'log') {
    appendWithMaxLength(log, [message.date, message.message])
    console.log("[LOG] added log to central log")
  } else if (message.cmd && message.cmd === 'add') {
    appendWithMaxLength(develcoMessages, message.message)
  }
})

app.get('/log', function (req, res) {
  let reversedLog = log.slice(0).reverse() // Clone the log to avoid global state
  var dateFormat = require('dateformat');

  let formattedLog =
      reversedLog.map(
	(value) => `[${dateFormat(value[0], "isoDateTime")}] ${value[1]}`
      ).join("</br>")
  res.send(formattedLog)
})

app.get('/msgs', function (req, res) {
  if (develcoMessages.length == 0) {
    res.send("No Messages Received")
  } else {
    let messages = develcoMessages.slice(0).reverse() // Clone the log to avoid global state
    let formattedMessages =
	messages.map(
	  (value) => `${value}`
	).join("</br>")

    res.send("Messages: </br>" + messages.join("</br>"))
  }
})

app.get('/env', function (req, res) {
  res.send('My Env:' + JSON.stringify(process.env))
})

app.get('/', function (req, res) {
  res.send('Your Hackathon App!')
})

app.listen(80, function () {
  console.log('Your Hackathon app is listening on port 80!')
})
