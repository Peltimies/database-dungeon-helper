require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
// haaetaan salaisten muuttujien arvot env-tiedostosta
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } = process.env;
// serverin portti haetaan env-tiedostosta tai se on 3000
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

/**************Passport-käyttöönotto*******************************************/

// Passportin käyttöönotto on sovelluksen päätiedostossa app.js.
// Se voitaisiin myös laittaa omaan tiedostoonsa
passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

// passportin login-session vaatii käyttäjän serialisointa (olio merkkijonoksi)
// passportissa on tähän omat metodit
// serialisointi
passport.serializeUser((user, cb) => {
  cb(null, user);
});
// ja deserialisointi
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

/******************************************************************************/

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
// tavallinen sessio
app.use(
  require('express-session')({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session()); // passport-sessio

app.use('/', routes);

app.listen(port);
