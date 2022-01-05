const cnf = require('../src/config')
const log = require('../src/utils/log')
const jsonProducts = require('./products.json')

const { connect } = require('../src/utils/db')
const Product = require('../src/api/v1/products/model')

const populateDB = async () => {
  try {
    await connect(cnf.db.uri, {}) // Connect DB
    log.info('Database connected')
    await Product.deleteMany()
    log.info('Cleared Products collection')
    await Product.create(jsonProducts)
    log.info('Products collection populated successfully')
    // eslint-disable-next-line no-process-exit
    process.exit(0)
  } catch (e) {
    log.error(e)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

populateDB()
