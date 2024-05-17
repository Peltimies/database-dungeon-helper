//Student-dokumentin skeema
const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const EncounterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  dice: {
    type: String,
    require: true,
    min: 1,
    max: 6,
  },

  //Muistiinpano, tähän varmaan pitää tehä toinen skeema rollille
  entities: {
    entity: {
      type: String,
    },
  },
});

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Encounter = mongoose.model('Table', EncounterSchema);
// exportataan model
module.exports = Encounter;
