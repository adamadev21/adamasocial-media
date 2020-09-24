const { db , admin} = require("../../utilities/admin");

exports.getAllScreams = (req, res) => {
    db.collection('screams')
      .orderBy('createdAt', 'desc')
      .get()
      .then((data) => {
        let screams = [];
        data.forEach((doc) => {
          screams.push({
            screamId: doc.id,
            body: doc.data().body,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
          });
        });
        //! the .json makes the returned response into a json file
        return res.json(screams);
      })
      .catch((err) => {
        console.error(err);
      });}
exports.postScream =(req, res) => {
    if (req.body.body.trim() === ''){
      return res.status(400).json({body: "Body must not be empty"})
    }
    const newScream = {
      body: req.body.body,
      userHandle: req.user.handle,
      createdAt: new Date().toISOString(),
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
  }