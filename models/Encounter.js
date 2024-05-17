//Student-dokumentin skeema
const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const EncounterSchema = new mongoose.Schema({
  entity: {
    type: String,
    require: true,
  },
  roll: {
    type: Number,
    require: true,
    min: 1,
    max: 6,
  },
});

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Encounter = mongoose.model('Table', EncounterSchema);
// exportataan model
module.exports = Encounter;
