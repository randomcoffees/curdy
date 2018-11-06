const mongoose = require('mongoose');

delete mongoose.models.ArraySubDocumentModel;

module.exports = mongoose.model('ArraySubDocumentModel', new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  list: [new mongoose.Schema({
    string: String,
    number: Number,
    date: Date,
    boolean: Boolean,
    list: [new mongoose.Schema({
      string: String,
      number: Number,
      date: Date,
      boolean: Boolean
    })]
  })]
}, {
  timestamps: true,
}));