import firebase from "firebase"

const config = {
    apiKey: "AIzaSyDCxbYNpGAxjh6yqZqM66ZFkYu3K4Qw-Q0",
    authDomain: "admasocial-media.firebaseapp.com",
    databaseURL: "https://admasocial-media.firebaseio.com",
    projectId: "admasocial-media",
    storageBucket: "admasocial-media.appspot.com",
    messagingSenderId: "760789328240",
    appId: "1:760789328240:web:343b8b52145d40a30c2fb5"
  };

  firebase.initializeApp(config)
export const storage = firebase.storage()
  