const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Employee",
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema)