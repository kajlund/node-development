const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A Task must have a name'],
      trim: true,
      maxlength: [50, 'A task name should contain max 50 characters'],
      minlength: [2, 'A task name must be more than 1 character long'],
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
const Task = mongoose.model('task', TaskSchema)

module.exports = Task
