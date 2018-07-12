const admin = require("firebase-admin");

const serviceAccount = require("./firebase-credentials.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://login-logup-app.firebaseio.com'
})
module.exports = admin.firestore();