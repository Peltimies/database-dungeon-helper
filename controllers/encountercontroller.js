/* eslint-disable new-cap */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Encounter = require('../models/Encounter');

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const EncounterController = {
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll(req, res) {
    Encounter.find()
      .then((encounters) => {
        res.json(encounters);
      })
      .catch((error) => {
        throw error;
      });
  },
  // haetaan 1 opiskelija id:n perusteella
  findById(req, res) {
    //Mongoose-kantaoperaatio tänne
    //findOne-metodin argumenttina on olio, jossa on hakuehto
    //kannassa olevan id:n (_id) on vastattava pyynnön mukana tulevaan id
    Kartta.findOne({ _id: req.params.id })
      // palautuva promise sisältää yhden opiskelijan
      .then((karttas) => {
        res.json(karttas);
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteById(req, res) {
    //Mongoose-kantaoperaatio tänne
    //findOneAndDelete-metodin argumenttina on olio, jossa on hakuehto
    //kannassa olevan id:n (_id) on vastattava pyynnön mukana tulevaan id
    Encounter.findOneAndDelete({ _id: req.params.id })
      // palautuva promise sisältää poistettavan opiskelijan
      .then((encounters) => {
        res.json(encounters);
      })
      .catch((error) => {
        throw error;
      });
  },
  //findByScode
  // jos haetaan opiskelijanumerolla, on hakuehto:
  // {studentcode: req.params.studentcode}

  //opiskelijan lisääminen async-awaitilla.
  async add(req, res) {
    //Mongoose-kantaoperaatio tänne
    //lisättävä opiskelija tulee asiakassovelluksesta
    // pyynnön eli requestin bodyssa, sen tyyppi muutetaan
    // heti Student-tyypiksi.
    const newEncounter = Encounter(req.body);
    const encounter = await Encounter.create(newEncounter).catch((error) => {
      throw error;
    });
    console.log('Map added to db' + encounter);
    //fronttisovellus voi välittömästi käyttää
    // lisättyä opiskelijaa, kun se palautetaan jsonina
    res.json(encounter);
  }, //jne...

  async update(req, res) {
    //päivitysmetodin argumenteiksi tulevat asiakkaalta
    // saatu id, joka määrittää mikä opiskelija päivitetään;
    // ja body, jossa on uusi data, joka laitetaan entisen päälle
    // put-metodilla
    const encounter = await Encounter.findByIdAndUpdate(
      req.params.id,
      req.body
    ).catch((error) => {
      throw error;
    });
    res.json(encounter);
  },
};

module.exports = EncounterController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:

router.get('/', StudentController.findAll);

jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
