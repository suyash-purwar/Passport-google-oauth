const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./firebase-setup');
const keys = require('./keys');

passport.serializeUser((user, done) => {
   console.log(user.id)
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   console.log(id + ' 1');
   db.collection('users').doc(id)
   .get()
   .then(user => {
      console.log(user.data())
      done(null, user.data());
   }).catch(() => console.log("Not getting it"))
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
               done(null, ref);
               console.log("You signed up successfully");
            });
         } else {
            done(null, snapshot.docs[0]);
         }
      })
      .catch(error => {
         console.log(error);
      });
   })
);