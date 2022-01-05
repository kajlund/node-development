/**
 * Server configures express server middleware and routes
 */
const path = require('path')

const cors = require('cors')
const express = require('express')
require('express-async-errors') // async wrapper
const PinoHttp = require('pino-http')

const cnf = require('./config')
const log = require('./utils/log')
const { connect } = require('./utils/db')

const logger = PinoHttp({ logger: log })

const app = express()
app.disable('x-powered-by')

// Configure middleware
app.use(logger) // Pino http logging using already configured logger
app.use(cors()) // Allow CORS
app.use(express.json({ limit: '1000kb' })) // Limit input data size
app.use(express.urlencoded({ extended: true })) // Support also form input
app.use(express.static(path.join(process.cwd(), 'public'))) // Serve public folder

/**
 * Start HTTP Server
 */
exports.start = async () => {
  try {
    await connect(cnf.db.uri, {}) // Connect DB
    log.info('Database connected')
    app.listen(cnf.port, () => {
      log.info(`Server started on http://localhost:${cnf.port}`)
    })
  } catch (e) {
    log.error(e)
  }
}

/**
 * Server Route Configurations
 */

app.get('/', (req, res) => {
  res.status(200).send('<h1>It works</h1>')
})

/**
 * @desc     PingPong server test
 * @route    GET /ping
 * @access   Public
 */
app.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

/**
 * API routes
 */

/**
 * Generic 404 middleware handler
 */
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }))

/**
 * Generic error middleware handler
 */
app.use((err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || err.status || 500,
    statusText: err.statusText || 'error',
    message: err.message || 'Internal Server Error',
  }

  // Add error stack in development
  if (cnf.isDev) {
    error.stack = err.stack
  }

  if (error.statusCode > 499) {
    log.error(err)
  }
  res.status(error.statusCode).json(error)
})
