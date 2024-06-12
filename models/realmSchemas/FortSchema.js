const mongoose = require('mongoose');

const FortSchema = new mongoose.Schema({
  type: String,
  name: String,
  landmarks: [String],
  population: String,
  founding: String,
  settlements: [String],
  cultures: [String],
  resource: String,
  description: String,
});

module.exports = mongoose.model('Fort', FortSchema);
