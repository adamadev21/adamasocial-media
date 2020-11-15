//?===================?
//?IMPORTS AND VARIABLES********
//????\\\*******************


const app = require('express')();
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

//*Allow cross origin resource sharing
const cors = require("cors");
const options = {
  origin: "http://localhost:3000",
  credentials: true,
}
app.all("*", cors(options))
//*===================>
//*ROUTES************
//******************* */
//? screams routes
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth, postScream);
app.get('/scream/:screamId', getScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.get('/scream/:screamId/delete', FBAuth, deleteScream);
app.post('/scream/:screamId/comment', FBAuth, postComment);
//*user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getusUserDetails);
app.get('notifications', FBAuth, markNotificationsRead)

exports.api = functions.https.onRequest(app);

//*Creat notifications
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate((snapshot) => {
   return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.err(err);
      });
  });

exports.createNotificationOnCreate = functions.firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userHandle!== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.err(err);
      });
  });

exports.deleteNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
  return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userHandle!== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`).delete();
        }
      })
      .catch((err) => {
        console.err(err);
      });
  });


  exports.onUserImageChange = functions.firestore.document(`/users/{userId}`)
  .onUpdate(change=>{
    console.log(change.before.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl){
      let batch = db.batch();
      return db.collection("screams").where("userHandle", "==", change.before.data().handle).get()
      .then(data=>{
        data.forEach(doc=>{
          const scream = db.doc(`/screams/${doc.id}`);
          batch.update(scream, { userImage: change.after.data().imageUrl })
        });
        return batch.commit();
      }); 
    }
  })

  exports.onScreamDeleted = functions.firestore.document(`/users/{userId}`)
  .onDelete((snapshot, context)=>{
    const screamId = context.params.screamId;
    const batch= db.batch();
    return db.collection('comments').where('screamId', '==', screamId).get()
    .then(data=>{
      data.forEach(doc=>{
        batch.delete(db.doc(`/likes/${doc.id}`));
      })
      return db.collection('likes').where('screamId', '==', screamId).get();
    })
    .then(data=>{
      data.forEach(doc=>{
        batch.delete(db.doc(`/notifications/${doc.id}`));
      })
      return db.collection('notifications').where('screamId', '==', screamId).get();
    })
    .then(data=>{
      data.forEach(doc=>{
        batch.delete(db.doc(`/notifications/${doc.id}`));
      })
      return batch.commit();
    })
    .catch(err=>{
      console.error(err);
      return res.status(500).json({error: err.code})
    })
  })
  //I added cors to see if it would help solve the problem
