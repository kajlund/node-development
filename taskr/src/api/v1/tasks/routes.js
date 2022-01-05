const express = require('express')

const {
  createOne,
  getMany,
  getOne,
  removeOne,
  updateOne,
} = require('./controller')

const router = express.Router()

router.route('/').get(getMany).post(createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(removeOne)

module.exports = router
