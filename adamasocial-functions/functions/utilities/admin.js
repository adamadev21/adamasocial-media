

var admin = require("firebase-admin");
var firebase = require("firebase/app");
require("firebase/storage")
const { config } = require("./config");
require("firebase/storage")
var serviceAccount = require("C:/Users/sawad/Downloads/admasocial-media-firebase-adminsdk-34bko-b28b6e3746.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admasocial-media.firebaseio.com"
});
const db = admin.firestore();
firebase.initializeApp(config)
const storage = firebase.storage()
module.exports = {admin, db, storage}