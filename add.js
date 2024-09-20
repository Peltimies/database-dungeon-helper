require('./dbconnection'); // koko tiedoston importtaus onnistuu

const Encounter = require('./models/Encounter'); // model

// Define your DnD encounters for wilderness encountersconst encounters = [
const encounters = [
  {
    biome: 'Highway',
    enc: [
      {
        name: 'Highwaymen',
        description:
          'A group of bandits, armed to the teeth, are lying in wait to harass unsuspecting travelers.',
      },
    ],
  },
  {
    biome: 'Dungeon',
    enc: [
      {
        name: 'Dungeonstalker',
        description: 'Dungeonman!!.',
      },
    ],
  },
  {
    biome: 'Settlement',
    enc: [
      {
        name: 'City man',
        description: 'City man!!.',
      },
    ],
  },
  {
    biome: 'Wilderness',
    enc: [
      {
        name: 'Hunter',
        description: 'Hunterman.',
      },
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
