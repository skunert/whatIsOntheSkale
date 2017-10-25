const express = require('express')
const axios = require('axios')
const base64 = require('base-64')
const uuid = require('uuid/v4')

const app = express()

const MAX_LENGTH = 100
let log = []
let develcoMessages = []

const HOST = process.env["GEENY_APPLICATION_BROKER_URL"]
const PUBLISHER_HOST = "https://gre-api.geeny.io/app"

// From /msgs
const THING_ID = "8601bdc3-6a39-4166-936c-a637f69fb948"
const USER_ID = "9e0667e7-280f-466c-9fe3-b250453446b2"

// From Develco APP: https://prod01-gitlab01.geeny.local/developers/home-smart-home-app/blob/master/config/default.js#L5
const DEVELCO_APP = 'a3a85485-7c3f-4bb8-b203-0eddb952c47c'
const MESSAGE_TYPE = '5d610b4f-5532-4e24-b46f-c355bdd99958'

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

async function publish(payload) {
  const url = `${PUBLISHER_HOST}/${DEVELCO_APP}/messageType/${MESSAGE_TYPE}/messages`
  log.push([null, url])
  const response = await axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      messages: [
        {
          messageId: uuid(),
          payload: base64.encode(payload),
          userId: USER_ID,
          thingId: THING_ID
        }
      ]
    }
  })
  return { message: 'success' };
}

app.get('/publish', async function (req, res) {
  try {
    const value = await publish('{ payload: "on" }')
    res.send(`Your publish result: ${value}`)
    return;
  } catch (err) {
    res.send(`Error: ${err.message}`)
    return;
  }
})

app.listen(80, function () {
  console.log('Your Hackathon app is listening on port 80!')
})
