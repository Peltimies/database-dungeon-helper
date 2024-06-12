const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new mongoose.Schema({
  name: String,
  cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  forts: [{ type: Schema.Types.ObjectId, ref: 'Fort' }],
  towns: [{ type: Schema.Types.ObjectId, ref: 'Town' }],
  villages: [{ type: Schema.Types.ObjectId, ref: 'Village' }],
});

module.exports = mongoose.model('Region', RegionSchema);
