/* UserController on Userin tietokantaoperaatiot
ja autentikaation sisältävä kontrolleri.
Se sisältää kaksi metodia: registerUser jolla
luodaan uusi käyttäjä kantaan ja authenticateUser
jolla suoritetaan autentikaatio.
*/

const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin.js');
const createToken = require('../createtoken.js');

const AdminController = {
  // uuden käyttäjän rekisteröinti
  async registerAdmin(req, res, next) {
    // passu kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const admin = await Admin.create({
      username: req.body.username,
      password: hashedPassword,
      isadmin: req.body.isadmin,
    }).catch((error) => {
      return res
        .status(500)
        .send('Käyttäjän rekisteröinti epäonnistui.' + error);
    });
    const token = createToken(admin); // tokenin luontimetodi
    // palautetaan token JSON-muodossa
    res.json({
      success: true,
      message: 'Tässä on valmis Token!',
      token: token,
    });
  },

  // olemassa olevan käyttäjän autentikaatio
  // jos autentikaatio onnistuu, käyttäjälle luodaan token
  async authenticateAdmin(req, res, next) {
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    const admin = await Admin.findOne({
      username: req.body.username,
    }).catch((error) => {
      throw error;
    });
    if (!admin) {
      //jos käyttääjää ei ole kannassa, autentikaatio epäonnistui.
      res.json({
        success: false,
        message: 'Autentikaatio epäonnistui. Syy 1',
      });
    } else if (admin) {
      // console.log(req.body.password); // lomakkelle syötetty salasana
      // console.log(user.password); // kannassa oleva salasana
      // verrataan lomakkeelle syötettyä salasanaa kannassa olevaan salasanaan
      // jos vertailtavat eivät ole samat, palautetaan tieto siitä että autentikaatio epäonnistui
      if (bcrypt.compareSync(req.body.password, admin.password) === false) {
        res.json({
          success: false,
          message: 'Autentikaatio epäonnistui. Syy 2',
        });
      } else {
        // jos salasanat ovat samat, luodaan token
        const token = createToken(admin); // tokenin luontimetodi
        // palautetaan token JSON-muodossa
        res.json({
          success: true,
          message: 'Tässä on valmis Token!',
          token: token,
        });
      }
    }
  },
};

module.exports = AdminController;
