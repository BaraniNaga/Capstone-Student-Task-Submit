const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  FrontendURL: {
    type: String
  },
  BackendURL: {
    type: String
  },
 Batch : {
    type: Number
  }
}, {
    collection: 'tasks'
  })

module.exports = mongoose.model('Task', taskSchema)