const { db } = require("../../utilities/admin");
const { reduceUserDetails } = require("../../utilities/helpers/validation");

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);
  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.userDetails = {
  credentials: {
    userId: "wvghRGVWAlMOiUfviJHrl7a8M2n1",
    email: "someone@gmail.com",
    handle: "user",
    createdAt: "2020-9-20",
    imageUrl: "image/dafa/afdfa",
    bio: "Hey, I am here",
    website: "https://user.com",
    location: "Madison, WI",
  },
  likes: [
    {
      userHandle: "user1",
      screamId: "dsfafdaf",
    },
    {
      userHandle: "user1",
      screamId: "dsfafdaf",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is what i said",
      createdAt: "2020-9-20T10:00:00.532",
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "sfadfaffafafasf",
      body: "this is what i said",
      createdAt: "2020-9-20T10:00:00.532",
    },
  ],
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  const handle = req.user.handle
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          createdAt: doc.data().createdAt,
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          type: doc.data().type,
          read: doc.data().read,
          screamId: doc.data().screamId,
          notificationId: doc.id,
        });
      });
      return db.collection("messages").where("recipient","==", handle).orderBy("sentAt","desc").get()
     })
     .then((data)=>{
       userData.messages = [];
       data.forEach(doc=>{
         userData.messages.push(doc.data())
       })
        return res.status(200).json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//*Get any users information
exports.getusUserDetails = (req, res) => {
  let userData = {};
  //*Get the user using their
  const likes = [];
  db.collection("likes")
    .where("userHandle", "==", req.params.handle)
    .get()
    .then((data) => data.forEach((doc) => likes.push(doc.data().screamId)));
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        //* Get their
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get()
          .then((data) => {
            userData.screams = [];
            //* Get all comments for this scream
            data.forEach((doc) => {
              let comments = [];
              //*For each scream, try adding a collection of comments
              db.collection("comments")
                .where("screamId", "==", doc.id)
                .get()
                .then((data) => {
                  //*if you get the comments, push it in the empty comment array
                  data.forEach((com) => {
                    console.log("comment is", com.data());
                    comments.push(com.data());
                  });
                  return comments;
                });
              userData.screams.push({
                body: doc.data().body,
                createdAt: doc.data().createdAt,
                userImage: doc.data().userImage,
                userHandle: doc.data().userHandle,
                fullName: doc.data().fullName,
                screamId: doc.id,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
                comments: comments,
              });
              const liked= [...userData.screams].filter(
                (scream) => likes.includes(scream.screamId)
              );
              userData.likedScreams = liked
            });
            return res.status(200).json(userData)
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      } else {
        return res.status(404).json("User not found");
      }
    });
};

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json(notification);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Doc not Found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//*Get user's liked screams

exports.getLikes = (req, res) => {
  const handle = req.params.handle;
  let screams = [];
  //*get the user's document and take their likes : {handle, screamid}
  db.collection("likes")
    .where("userHandle", "==", handle)
    .get()
    .then((data) => {
      const likes = [];
      data.forEach((doc) => {
        likes.push(doc.data().screamId);
      });
      console.log(likes);
      return db
        .collection("screams")
        .where("screamId", "in", likes)
        .get()
        .then((docs) => {
          docs.forEach((doc) => screams.push(doc.data()));
        });
    })
    .then(() => {
      console.log(screams);
      return res.status(200).json(screams);
    })
    .catch((err) => {
      console.error(err);
    });
};
