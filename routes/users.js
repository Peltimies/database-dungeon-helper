const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const userCon = require('../controllers/usercontroller');

// rekisteröityminen eli luodaan uudet tunnarit
// http://localhost:3000/users/register
router.post('/register', userCon.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', userCon.authenticateUser);

module.exports = router;
