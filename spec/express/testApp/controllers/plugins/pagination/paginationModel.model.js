const mongoose = require('mongoose');

module.exports = mongoose.model('PaginationModel', new mongoose.Schema({
  name: String
}, {
  timestamps: true,
}));