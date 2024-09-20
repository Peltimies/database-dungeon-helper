//Student-dokumentin skeema
const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const EncounterSchema = new mongoose.Schema({
  biome: {
    type: String,
    require: true,
  },
  enc: [
    {
      name: String,
      descrption: String,
    },
  ],
});

//Muistiinpano, tähän varmaan pitää tehä toinen skeema rollille

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Encounter = mongoose.model('Table', EncounterSchema);
// exportataan model
module.exports = Encounter;
