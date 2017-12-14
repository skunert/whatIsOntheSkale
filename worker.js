const axios = require('axios')
const base64 = require('base-64')
const config = require('./config.js')
const api = require('./api.js')

const { appId, subscribeUrl, authToken, subscribeMessageTypes } = config

const request = api.request

let activeIterators = []

let allShards = []

let nextShardIndex = 0

const concurrentRequestsLimit = 8

const iteratorConfig = {
  iteratorType: 'LATEST',
  maxBatchSize: 500
}

async function getShards(messageTypeId) {
  const url = `${subscribeUrl}/${appId}/messageType/${messageTypeId}`
  const response = await request('get', url)
  return response.shards
}

async function getIterator(shardId, messageTypeId) {
  const data = {
    shardId,
    iteratorType: iteratorConfig.iteratorType,
    maxBatchSize: iteratorConfig.maxBatchSize
  }
  const iterator = await request('post', `${subscribeUrl}/${appId}/messageType/${messageTypeId}/iterator`, data)

  return iterator.shardIterator
}

async function pullShards(messageTypeId) {
  const receivedShards = await getShards(messageTypeId)
  const shards = await Promise.all(
    receivedShards.map(async shard => ({
      shardId: shard.shardId,
      messageTypeId,
      nextIterator: await getIterator(shard.shardId, messageTypeId)
    }))
  )
  allShards = allShards.concat(shards)
}

function pullMessages(onMessage) {
  if (allShards.length && activeIterators.length < concurrentRequestsLimit) {
    const shard = allShards[nextShardIndex]
    activeIterators.push(shard.nextIterator)

    nextShardIndex = nextShardIndex >= allShards.length - 1 ? 0 : nextShardIndex + 1

    getMessages(shard, onMessage)
  }

  setTimeout(() => pullMessages(onMessage), 10)
}

function getMessages(shard, onMessage) {
  const iterator = shard.nextIterator
  const url = `${subscribeUrl}/${appId}/messageType/${shard.messageTypeId}/iterator/${iterator}`
  request('get', url).then(data => {
    //console.log(`Received messages (${iterator}): ${JSON.stringify(data)}`)
    shard.nextIterator = data.nextIterator
    const index = activeIterators.indexOf(iterator)
    activeIterators = [...activeIterators.slice(0, index), ...activeIterators.slice(index + 1)]

    if (data.messages.length > 0) {
      for (let message of data.messages) {
        let parsedMessage = {
          userId: message.userId,
          thingId: message.thingId,
          messageTypeId: shard.messageTypeId,
          data: base64.decode(message.payload)
        }
        onMessage(parsedMessage)
      }
    }
  })
}

async function startAll(onMessage) {
  pullMessages(onMessage);
  Object.keys(subscribeMessageTypes).forEach(id => pullShards(id))
}

startAll(function(data) {
  process.send({
    cmd: "add",
    message: JSON.stringify(data)
  })
})
