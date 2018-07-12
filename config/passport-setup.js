const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./firebase-setup');
const keys = require('./keys');

passport.use(
   new GoogleStrategy({
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect'
   },
   
   (accessToken, refreshToken, profile, done) => {
      db.collection('users').where('googleID', '==', profile.id).get()
      .then(snapshot => {
         if (snapshot.docs.length == 0) {
            db.collection('users').add({
               googleID: profile.id,
               username: profile.displayName
            });
            
            console.log("You signed up successfully");
         } else {
            snapshot.docs.forEach(doc => {
               console.log(doc.data());
            });
         }
      })
      .catch(error => {
         console.log(error);
      });
   })
);