const mongoose = require('mongoose');

delete mongoose.models.ArrayModel;

module.exports = mongoose.model('ArrayModel', new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  list: [{
    string: String,
    number: Number,
    date: Date,
    boolean: Boolean,
    list: [{
      string: String,
      number: Number,
      date: Date,
      boolean: Boolean
    }]
  }]
}, {
  timestamps: true,
}));