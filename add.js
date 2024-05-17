require('./dbconnection'); // koko tiedoston importtaus onnistuu

const Encounter = require('./models/Encounter'); // model

// Define your DnD encounters for wilderness encountersconst encounters = [
const encounters = [
  {
    name: 'Wilderness Encounters',
    dice: '1d6',
    entities: [
      { entity: 'Bandits', roll: 1 },
      { entity: 'Anturai', roll: 2 },
      { entity: 'Wild animals', roll: 3 },
      { entity: 'Rangers', roll: 4 },
      { entity: 'Hunters', roll: 5 },
      { entity: 'Cultists', roll: 6 },
    ],
  },
  {
    name: 'Dungeon Encounters',
    dice: '1d6',
    entities: [
      { entity: 'Chuds', roll: 1 },
      { entity: 'Ghouls', roll: 2 },
      { entity: 'Danji-kai', roll: 3 },
      { entity: 'Anturai', roll: 4 },
      { entity: 'Rival adventuring party', roll: 6 },
    ],
  },
];
// Insert wilderness encounters into the database

Encounter.insertMany(encounters)
  .then((docs) => {
    console.log('Encounters inserted successfully:', docs);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error inserting encounters:', err);
    process.exit(1);
  });
