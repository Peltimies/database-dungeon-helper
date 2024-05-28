const mongoose = require('mongoose');

// Mongoose skeema tarjoaa MongoDb:n tiedoille mallin ja validoinnin
// sekä rajoittimia.

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, required: true },
});

// skeemasta pitää tehdä model jonka kautta kantaoperaatioita tehdään
const Admin = mongoose.model('User', AdminSchema);
// exportataan model
module.exports = Admin;
