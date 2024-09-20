/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const realmCon = require('../controllers/realmcontroller');

router.get('/', realmCon.findAll);

// http://localhost:3000/realms/:id
router.get('/realms/:rname', realmCon.findByName);

router.delete('/:id', realmCon.deleteById);

module.exports = router;
