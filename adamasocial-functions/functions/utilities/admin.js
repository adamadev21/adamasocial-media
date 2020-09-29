

var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/Adama Sawadogo/Downloads/admasocial-media-firebase-adminsdk-34bko-e85cba818a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admasocial-media.firebaseio.com"
});
const db = admin.firestore();

module.exports = {admin, db}