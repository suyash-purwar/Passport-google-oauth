const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require('./keys');

passport.use(
   new GoogleStrategy({
      // options for the google consent box start
      clientID: keys.google.clientID.trim(),
      clientSecret: keys.google.clientSecret.trim(),
      callbackURL: 'auth/google/redirect'
   },
   
   (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(accessToken);
   })
);