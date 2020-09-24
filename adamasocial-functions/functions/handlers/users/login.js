
const firebase = require('firebase');
const { db } = require("../../utilities/admin");
const { loginValidation } = require("../../utilities/helpers/validation");
exports.login = (req, res)=>{
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    loginValidation(user);
    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
    .then(data=>{
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token})
    })
    .catch(err => {
      console.error(err)
      if(err.code==="auth/wrong-password") res.status(400).json({password: "Wrong password, please try again"})
      res.status(500).json({error: err.code})
    })
  }