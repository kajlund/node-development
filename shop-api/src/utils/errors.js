/**
 * Error class for creating custom error messages in controllers
 * Should contain info safe to send back to client.
 */
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.statusText = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

const getCustomError = (msg, statusCode) => {
  return new CustomError(msg, statusCode)
}

module.exports = {
  CustomError,
  getCustomError,
}
