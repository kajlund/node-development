/**
 * App main entry point.
 * Loads environment variables (.env in root folder) and starts server
 */

const log = require('./utils/log')

const { start } = require('./server.js')

process.on('uncaughtException', function (err) {
  log.error('UNCAUGHT EXCEPTION - ' + (err.stack || err))
  throw err
})

process.on('unhandledRejection', (reason, p) => {
  log.error(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`)
  throw err
})

log.info('Starting server')
start()
