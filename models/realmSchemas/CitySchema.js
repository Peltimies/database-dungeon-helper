const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
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

module.exports = mongoose.model('City', CitySchema);
