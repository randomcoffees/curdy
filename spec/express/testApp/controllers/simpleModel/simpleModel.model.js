const mongoose = require('mongoose');

module.exports = mongoose.model('SimpleModel', new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean
}, {
  timestamps: true,
}));