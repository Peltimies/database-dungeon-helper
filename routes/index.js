/* eslint-disable new-cap */
/*

index.js sisältää localhost:3000/ -juuriosoitteen reitit
*/

const express = require('express');
// Reititys toimii router -olion kautta
const router = express.Router();

// Reitti sovelluksen juureen osoitteessa http://localhost:3000
// Kun mennään sovelluksen juureen, katsotaan ollanko jo kirjauduttu

// routerin get-metodi tarkoittaa sitä, että me haemme(get) tietoa palvelimelta
// req - pyyntö, palvelin ottaa dataa sisään eli pyytää dataa
// res - astaUS, PALVELIN TARJOAA DATAA ULOS RES-OLION KAUTTA
// next - kutsuttaessa siirrytään seuraavaan reittiin
router.get('/', function (req, res, next) {
  res.render('index', {
    // palvelimen etusivu
    title: 'Express REST-API',
  });
});

module.exports = router;
