const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./firebase-setup');
const keys = require('./keys');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   db.collection('users').doc(id)
   .get()
   .then(user => {
      done(null, user);
   });
});

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
            // create a new user in db            
            db.collection('users').add({
               googleID: profile.id,
               username: profile.displayName
            }).then(ref => {
               done(null, ref.id);
               console.log("You signed up successfully");
            });
         } else {
            // already have the user
            snapshot.docs.forEach(doc => {
               console.log(doc.data());
            });

            done(null, snapshot.docs[0].id);
         }
      })
      .catch(error => {
         console.log(error);
      });
   })
);