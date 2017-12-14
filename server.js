const cluster = require('cluster')

if (cluster.isMaster) {
  let fetcherSetup = { exec: 'worker.js' }
  let appSetup = { exec: 'app.js' }

  cluster.setupMaster(fetcherSetup)
  let fetcher = cluster.fork()

  cluster.setupMaster(appSetup)
  let app = cluster.fork()

  cluster.on('exit', function (worker, code, signal) {
    let length = worker.process.spawnargs.length
    let config = worker.process.spawnargs[length - 1] === 'worker.js' ? fetcherSetup : appSetup

    cluster.setupMaster(config)
    cluster.fork()
  })

  let log = []
  function messageHandler(worker, message, handle) {
    app.send(message)
    console.log(`redirected message: ${JSON.stringify(message)} to app-server`)
  }
  cluster.on('message', messageHandler)
}
