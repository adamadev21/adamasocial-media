//?First of all, I require the functions from firebase-functions
//?admin is the gate to my firebase
//?then I initialize the app!


const firebase = require('firebase')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
//*Here we are using express as a framework, which is pretty awesome to use
const express = require('express');
const { firebaseConfig } = require('firebase-functions');
const app = express();

//? Like the name suggests, this is a get request
app.get('/screams', (req, res) => {
  admin
    .firestore()
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      //! the .json makes the returned response into a json file
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/screams', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };
  admin
    .firestore()
    .collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong!' });
      console.error(err);
    });
});

//*Signup route
//! This signup is not working yet
//TODO: FIX this and make sure your can retrive the user
app.post("/signup", (req,res)=>{

  const newUser = {
    email: req.body.password,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
  .then(data=>{
    return res.status(201).json({message: `user ${data.user.uid} has signed up successfully`} )
  })
  .catch(err=>{
    console.error(err);
    return res.status(500).json({error: err.code})
  })
});
exports.api = functions.https.onRequest(app);
