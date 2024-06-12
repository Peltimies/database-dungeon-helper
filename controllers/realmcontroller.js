const Realm = require('../models/realmSchemas/RealmSchema');
const Region = require('../models/realmSchemas/RegionSchema');
const City = require('../models/realmSchemas/CitySchema');
const Fort = require('../models/realmSchemas/FortSchema');
const Town = require('../models/realmSchemas/TownSchema');
const Village = require('../models/realmSchemas/VillageSchema');

const RealmController = {
  findAll(req, res) {
    Realm.find()
      .populate({
        path: 'regions',
        populate: [
          { path: 'cities', model: 'City' },
          { path: 'forts', model: 'Fort' },
          { path: 'towns', model: 'Town' },
          { path: 'villages', model: 'Village' },
        ],
      })
      .then((realms) => {
        res.json(realms);
      })
      .catch((error) => {
        throw error;
      });
  },

  findByName(req, res) {
    Realm.find({ _id: req.params.id })
      .populate({
        path: 'regions',
        populate: [
          { path: 'cities', model: 'City' },
          { path: 'forts', model: 'Fort' },
          { path: 'towns', model: 'Town' },
          { path: 'villages', model: 'Village' },
        ],
      })
      .then((realm) => res.json(realm))
      .catch((error) => {
        throw error;
      });
  },

  create(req, res) {
    const regions = req.body.regions.map((region) => {
      const cities = region.cities.map((city) => new City(city));
      const forts = region.forts.map((fort) => new Fort(fort));
      const towns = region.towns.map((town) => new Town(town));
      const villages = region.villages.map((village) => new Village(village));

      return new Region({
        ...region,
        cities: cities.map((city) => city._id),
        forts: forts.map((fort) => fort._id),
        towns: towns.map((town) => town._id),
        villages: villages.map((village) => village._id),
      });
    });

    const newRealm = new Realm({
      ...req.body,
      regions: regions.map((region) => region._id),
    });

    Promise.all([
      ...regions.map((region) => region.save()),
      ...regions.flatMap((region) => [
        ...region.cities.map((city) => city.save()),
        ...region.forts.map((fort) => fort.save()),
        ...region.towns.map((town) => town.save()),
        ...region.villages.map((village) => village.save()),
      ]),
      newRealm.save(),
    ])
      .then(() => res.json(newRealm))
      .catch((error) => {
        throw error;
      });
  },

  updateById(req, res) {
    Realm.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((realm) => {
        console.log(`Realm ${req.params.id} updated`);
        res.json(realm);
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteById(req, res) {
    Realm.findOneAndDelete({ _id: req.params.id })
      .then((realm) => {
        console.log(`Realm ${req.params.id} deleted`);
        res.json(realm);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = RealmController;
