/* eslint-disable new-cap */

const express = require('express');
const router = express.Router();
const sc = require('../controllers/encountercontroller');

//http://localhost:3000/students/
router.get('/', sc.findAll);

//http://localhost:3000/students/
// : id:n edessä tarkoittaa että id on dynaaminen eli vaihtuva, ei aina sama.
// Dynaamisen reittiprarametrin merkki on :
router.get('/:id', sc.findById);

//http://localhost:3000/students/
router.post('/', sc.add);

//http://localhost:3000/students/
//reitti on sama kuin haettaessa id:n perusteella, mutta
// tämä reitti valitaan http-metodin perusteella
router.delete('/:id', sc.deleteById);

//http://localhost:3000/students/
router.put('/id', sc.update);

module.exports = router;
