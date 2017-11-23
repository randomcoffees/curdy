const mongoose = require('mongoose');

delete mongoose.models.PaginationModel;

module.exports = mongoose.model('PaginationModel', new mongoose.Schema({
  name: String
}, {
  timestamps: true,
}));