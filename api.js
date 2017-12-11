const axios = require('axios')
const config = require('./config.js')

const authToken = config.authToken

exports.request = async function (method, url, data) {
  //console.log(`Sending request: ${method} ${url} with data: ${JSON.stringify(data)}`)
  try {
    const response = await axios.request({
      method: method,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${authToken}`
      },
      data: data
    })
    //console.log(`Received response from ${method} ${url} ${JSON.stringify(response.data)}`)
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
