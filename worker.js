const axios = require('axios')
const sleep = require('sleep')
const base64 = require('base-64')
// const config = require('config')
const thingState = require('./modules/thingState')

const appId = process.env["GEENY_APPLICATION_ID"]
const host = process.env["GEENY_APPLICATION_BROKER_URL"]

const brokerConfig = {
  appId: 'ae118b65-d186-41c7-85db-9630c7dc666d', // <-  Your App ID
  messageTypeId: '54121087-14f1-4c2a-835f-117681618cc9', // incoming Develco messageType
  iteratorType: 'LATEST',
  maxBatchSize: 10
}



async function request (method, url, data) {
  try {
    const response = await axios.request({
      method: method,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: data
    })
    return response.data
  } catch (err) { throw err }
}

async function getShards () {
  try {
    const url = `${host}/application/${brokerConfig.appId}/messageType/${brokerConfig.messageTypeId}`
    console.log(url)
    const response = await request('get', url)
    console.log(response)
    return response.shards
  } catch (err) { throw err }
}

async function getIterator (shardId) {
  try {
    const data = {
      shardId: shardId,
      iteratorType: brokerConfig.iteratorType,
      maxBatchSize: brokerConfig.maxBatchSize
    }

    const iterator = await request('post', `${host}/app/${brokerConfig.appId}/messageType/${brokerConfig.messageTypeId}/iterator`, data)

    return iterator.shardIterator
  } catch (err) { throw err }
}

async function getMessages (iterator) {
  try {
    const data = await request('get', `${host}/app/${brokerConfig.appId}/messageType/${brokerConfig.messageTypeId}/iterator/${iterator}`)

    if (data.messages.length > 0) {
      for (let message of data.messages) {
        await thingState.set(message.userId, message.thingId, base64.decode(message.payload))
        console.log('thingState updated', message.thingId)
      }
      sleep.msleep(250)
    } else {
      sleep.sleep(1)
    }
    getMessages(data.nextIterator)
  } catch (err) { throw err }
}

async function start () {
  try {
    const shards = await getShards()

    const iterator = await getIterator(shards[0].shardId)

    await getMessages(iterator)
  } catch (err) {
    console.log("here?")
    console.log(err.message)

    // try restart worker after 1 sec
    sleep.sleep(1)
    start()
  }
}

// run worker
start()
