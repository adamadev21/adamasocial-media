//?===================?
//?IMPORTS AND VARIABLES********
//????\\\*******************
const { FBAuth } = require('./utilities/middleware/middleware');
const functions = require('firebase-functions');
const {
  getAllScreams,
  postScream,
  likeScream,
  deleteScream,
  unlikeScream,
} = require('./handlers/screams/screams');
const { login } = require('./handlers/users/login');
const { signup } = require('./handlers/users/signup');
const { uploadImage } = require('./handlers/users/userMedia');
const {
  addUserDetails,
  getAuthenticatedUser,
  getScream,
  getusUserDetails,
  markNotificationsRead,
} = require('./handlers/users/userInfo');
const { postComment } = require('./handlers/screams/comments/comments');
const admin = require('./utilities/admin');
const { db } = require('./utilities/admin');
const app = require('express')();

//*===================>
//*ROUTES************
//******************* */
//? screams routes
app.get('/screams', FBAuth, getAllScreams);
app.post('/screams', FBAuth, postScream);
app.get('/scream/:screamId', getScream);
app.get('/screams/:screamId/like', FBAuth, likeScream);
app.get('/screams/:screamId/unlike', FBAuth, unlikeScream);
app.get('/screams/:screamId/delete', FBAuth, deleteScream);
app.post('/screams/:screamId/comment', FBAuth, postComment);
//*user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
//TODO Get user details and get notifications
app.get('/user/:handle', getusUserDetails);
app.get('notifications', FBAuth, markNotificationsRead)
exports.api = functions.https.onRequest(app);

//*Creat notifications
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/F${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.err(err);
        return;
      });
  });

exports.createNotificationOnCreate = functions.firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/F${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.err(err);
        return;
      });
  });

exports.deleteNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).delete();
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.err(err);
        return;
      });
  });
