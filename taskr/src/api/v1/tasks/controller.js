const Task = require('./model')
const { getCustomError } = require('../../../utils/errors')
const asyncWrapper = require('../../../utils/async')

exports.createOne = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

exports.getMany = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

exports.getOne = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id })
  if (!task) {
    return next(
      getCustomError(`A task with id: "${req.params.id}" was not found`, 404)
    )
  }
  res.status(200).json({ task })
})

exports.removeOne = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id })
  if (!task) {
    return next(
      getCustomError(`A task with id: "${req.params.id}" was not found`, 404)
    )
  }
  res.status(200).json({ task })
})

exports.updateOne = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(
      getCustomError(`A task with id: "${req.params.id}" was not found`, 404)
    )
  }
  res.status(200).json({ task })
})
