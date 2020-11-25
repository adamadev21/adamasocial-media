const { debug } = require("firebase-functions/lib/logger");
const { uuid } = require("uuidv4");
const { db, admin, storage } = require("../../utilities/admin");
const firebase = require("firebase/app");
const { config } = require("../../utilities/config");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          author: doc.data().author,
          pictureUrl: doc.data().pictureUrl ? doc.data().pictureUrl : null,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
        });
      });
      //*the .json makes the returned response into a json file
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ general: "Something went wrong" });
    });
};
exports.postScream = (req, res) => {
  console.log(req.body)
  if (req.body.body.trim() === "") {
    return res.status(400).json({ error: "Body must not be empty" });
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    comments: [],
    pictureUrl: req.body.imageUrl? req.body.imageUrl : null,
    author: req.body.author,
    likes: [],
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
  };
  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      db.doc(`screams/${doc.id}`).update({ screamId: resScream.screamId });
    return  res.json(resScream);

    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong!" });
      console.error(err);
    });
};

//*Like a scream
exports.likeScream = (req, res) => {
  let likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);
  let screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      console.log(doc);
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      } else {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.status(201).json(screamData);
          });
      } else {
        return res.status(400).json("Scream already liked");
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err.code);
    });
};
//*unLike a scream
exports.unlikeScream = (req, res) => {
  let likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);
  let screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      console.log(doc);
      if (!doc.exists) {
        return res.json({ error: "Scream not found" });
      } else {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(500).json("Scream not liked yet");
      } else {
        return db
          .doc(`/likes/${data.docs[0].data().id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.status(201).json(screamData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err.code);
    });
};

//*Delete a scream
exports.deleteScream = (req, res) => {
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      //*Check whether its the user's scream, if not they cannot delete it
      if (req.user.handle === doc.data().userHandle) {
        db.collection("screams")
          .doc(req.params.screamId)
          .delete()
          .then((time) => {
            return res
              .status(201)
              .json(`Scream successfully deleted at ${time}`);
          })
          .catch((err) => {
            console.error(err);
            return res.status(400).json({ error: err.code });
          });
      } else {
        return res
          .status(400)
          .json("You are not allowed to delete others' screams!");
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
};

const uploadImage = (image) => {
  console.log(image)
 const uploadTask = storage.ref(`postimages/${image.name}`).put(image);
 uploadTask.on(
  "state_changed",
  snapshot => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    console.log(progress);
  },
  error => {
    console.log(error);
  },
  () => {
storage
      .ref("postimages")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        return url
      });
  }
);
};
