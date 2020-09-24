const config = require('../../utilities/config');
const firebase = require('firebase');
const { db, admin} = require("../../utilities/admin");
const { signupValidation } = require("../../utilities/helpers/validation");
firebase.initializeApp(config);
exports.signup = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
    };
    console.log(newUser);
    console.log("config", config)
  signupValidation(newUser);
    //* let's handle the user data here
    let token, userId;
    const noImg = 'noImage';
    db.doc(`/users/${newUser.handle}`)
      .get()
      .then((data) => {
        if (data.exists) {
          return res.status(400).json({ handle: 'This handle is already taken' });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          password: newUser.password,
          createdAt: new Date().toISOString(),
          imageUrl : `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
          userId,
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'email already in use' });
        } else {
          return res.status(500).json({ error: err.code });
        }
      });
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        return res
          .status(201)
          .json({ message: `user ${data.user.uid} has signed up successfully` });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  };