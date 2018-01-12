const mongoose = require('mongoose');

delete mongoose.models.SimpleSortModel;

module.exports = mongoose.model('SimpleSortModel', new mongoose.Schema({
  name: String
}, {
  timestamps: true,
}));