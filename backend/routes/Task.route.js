let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Task Model
let taskSchema = require('../models/Task')

// CREATE Task
router.route('/create-task').post((req, res, next) => {
  taskSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ task
router.route('/').get((req, res) => {
  taskSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single task
router.route('/edit-task/:id').get((req, res) => {
  taskSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update task
router.route('/update-task/:id').put((req, res, next) => {
  taskSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Task updated successfully !')
      }
    },
  )
})

// Delete Task
router.route('/delete-task/:id').delete((req, res, next) => {
  taskSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
