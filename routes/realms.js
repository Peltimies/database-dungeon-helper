/* eslint-disable new-cap */
const express = require('express');
const {
  findAll,
  findByName,
  create,
  updateById,
  deleteById,
} = require('../controllers/realmcontroller');

const router = express.Router();

router.get('/realms', findAll);
router.get('/realms/:id', findByName);
router.post('/realms', create);
router.put('/realms/:id', updateById);
router.delete('/realms/:id', deleteById);

module.exports = router;
