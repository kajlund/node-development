const mongoose = require('mongoose')

/**
 * Connects to DB as configured in cnf
 */
exports.connect = (uri, opts = {}) => {
  return mongoose.connect(uri, {
    ...opts,
  })
}
