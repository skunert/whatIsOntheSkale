const express = require('express')
const app = express()

app.get('/env', function (req, res) {
  res.send('My Env:' + JSON.stringify(process.env))
})

app.get('/', function (req, res) {
  res.send('Hello Node!')
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
