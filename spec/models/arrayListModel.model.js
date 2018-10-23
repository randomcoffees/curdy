const mongoose = require('mongoose');

delete mongoose.models.ArrayListModel;

module.exports = mongoose.model('ArrayListModel', new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  list: [Number]
}, {
  timestamps: true,
}));