const mongoose = require('mongoose');

const VillageSchema = new mongoose.Schema({
  type: String,
  name: String,
  population: String,
  founding: String,
  cultures: [String],
  resource: String,
  description: String,
});

module.exports = mongoose.model('Village', VillageSchema);
