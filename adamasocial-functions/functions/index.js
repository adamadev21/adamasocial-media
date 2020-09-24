//?===================?
//?IMPORTS AND VARIABLES********
//????\\\*******************
const {FBAuth} = require('./utilities/middleware/middleware');
const functions = require('firebase-functions');
const { getAllScreams, postScream } = require('./handlers/screams/screams');
const { login } = require('./handlers/users/login');
const { signup } = require('./handlers/users/signup');
const {uploadImage} = require('./handlers/users/userMedia')
const app = require('express')();
//*===================>
//*ROUTES************
//******************* */
//? screams routes
app.get('/screams', FBAuth, getAllScreams);
app.post('/screams', FBAuth, postScream);
//*user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage)
exports.api = functions.https.onRequest(app);
