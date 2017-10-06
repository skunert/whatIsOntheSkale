const cluster = require('cluster')

const fetcherSetup = { exec: 'worker.js' }
const appSetup = { exec: 'app.js' }

if (cluster.isMaster) {
  cluster.setupMaster(fetcherSetup)
  cluster.fork()

  cluster.setupMaster(appSetup)
  cluster.fork()

  cluster.on('exit', function (worker, code, signal) {
    let length = worker.process.spawnargs.length
    let config = worker.process.spawnargs[length - 1] === 'worker.js' ? fetcherSetup : appSetup

    cluster.setupMaster(config)
    cluster.fork()
  })
}
