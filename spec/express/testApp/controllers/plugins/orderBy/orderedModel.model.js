const mongoose = require('mongoose');

delete mongoose.models.OrderedModel;

module.exports = mongoose.model('OrderedModel', new mongoose.Schema({
  name: String
}, {
  timestamps: true,
}));