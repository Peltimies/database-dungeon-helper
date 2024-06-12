const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RealmSchema = new mongoose.Schema({
  name: String,
  regions: [{ type: Schema.Types.ObjectId, ref: 'Region' }],
});

module.exports = mongoose.model('Realm', RealmSchema);
