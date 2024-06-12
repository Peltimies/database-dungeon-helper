const mongoose = require('mongoose');

const TownSchema = new mongoose.Schema({
  type: String,
  name: String,
  population: String,
  founding: String,
  cultures: [String],
  resource: String,
  description: String,
});

module.exports = mongoose.model('Town', TownSchema);
