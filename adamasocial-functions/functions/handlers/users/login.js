
const firebase = require('firebase');
const { db } = require("../../utilities/admin");
const { loginValidation } = require("../../utilities/helpers/validation");
exports.login = (req, res)=>{
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const {errors, valid} = loginValidation(user);
    if (valid) {

      firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .then(data=>{
        return data.user.getIdToken();
      })
      .then(token => {
        return res.json({token})
      })
      .catch(err => {
        console.error(err)
        errors.general = "Wrong credentials, please try again!"
        res.status(500).json(errors)
      })
    } else {
      return res.status(400).json(errors);
    }
  }