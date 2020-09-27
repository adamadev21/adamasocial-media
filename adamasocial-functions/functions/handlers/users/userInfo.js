const { db } = require('../../utilities/admin');
const { reduceUserDetails } = require('../../utilities/helpers/validation');

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);
  db.doc(`/users/{req.user.handle}`)
    .set(userDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.userDetails = {
  credentials: {
    userId: 'wvghRGVWAlMOiUfviJHrl7a8M2n1',
    email: 'someone@gmail.com',
    handle: 'user',
    createdAt: '2020-9-20',
    imageUrl: 'image/dafa/afdfa',
    bio: 'Hey, I am here',
    website: 'https://user.com',
    location: 'Madison, WI',
  },
  likes: [
    {
      userHandle: 'user1',
      screamId: 'dsfafdaf',
    },
    {
      userHandle: 'user1',
      screamId: 'dsfafdaf',
    },
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'this is what i said',
      createdAt: '2020-9-20T10:00:00.532',
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'sfadfaffafafasf',
      body: 'this is what i said',
      createdAt: '2020-9-20T10:00:00.532',
    },
  ],
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection('likes')
          .where('userHandle', '==', req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc);
      });
      return db.collection("notifications").where("recipient", '==', req.user.handle).orderBy('createdAt', 'desc').limit(10).get()
    })
    .then (data=>{
      userData.notifications = [];
      data.forEach(doc=>{
        userData.notifications.push({
          createdAt: doc.data().createdAt,
            recipient: doc.data().recipient,
            sender: doc.data().sender,
            type: doc.data().type,
            read: doc.data().read,
            screamId: doc.data().screamId,
            notificationId: doc.id
          });
        })
      })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//*Get any users information
exports.getusUserDetails = (req,res)=>{
  let userData= {};
  db.doc(`/users/${req.params.handle}`).get()
  .then(doc=>{
    if(doc.exists){
      userData.user = doc.data();
      return db.collection("screams").where('userHandle', '==', req.params.handle)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data=>{
        userData.screams=[];
        data.forEach(doc=>{
          userData.screams.push({
            body: doc.data().body,
            createdAt: doc.data().createdAt,
            userHandle: doc.data().userHandle,
            screamId: doc.id,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount
          })
          
        });
        return res.json(userData)
      })
      .catch(err=>{
        console.error(err);
        return res.status(500).json({error: err.code})
      })
    } else {
      return res.status(404).json("User not found")
    }
  })
}

exports.markNotificationsRead = (req, res)=>{
  let batch = db.batch();
  req.body.forEach(notificationId=>{
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, {read: true});
  });
  batch.commit()
  .then(()=>{
    return res.json(notification)
  })
  .catch(err=>{
    console.error(err);
    return res.status(500).json({error: err.code})
  })
}
exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
        console.log(doc);
      if (!doc.exists) {
        return res.status(404).json({ message: 'Doc not Found' });
      } 
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection('comments')
        .orderBy("createdAt", 'desc')
        .where('screamId', '==', req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      console.log(screamData)
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
