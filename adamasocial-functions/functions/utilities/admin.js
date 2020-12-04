

var admin = require("firebase-admin");
var firebase = require("firebase/app");
require("firebase/storage")
const { config } = require("./config");
require("firebase/storage")
var serviceAccount = require("./admasocial-media-firebase-adminsdk-34bko-6b7cdc49f7.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admasocial-media.firebaseio.com"
});
const db = admin.firestore();
firebase.initializeApp(config)
const storage = firebase.storage()
module.exports = {admin, db, storage}