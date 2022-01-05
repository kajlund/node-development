const express = require('express')

const { getAllProductsStatic, getAllProducts } = require('./controller')

const router = express.Router()

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router
