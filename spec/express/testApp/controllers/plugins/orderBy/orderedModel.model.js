const mongoose = require('mongoose');

module.exports = mongoose.model('OrderedModel', new mongoose.Schema({
  name: String
}, {
  timestamps: true,
}));