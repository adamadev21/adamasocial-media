const { db } = require('../../../utilities/admin');

exports.postComment = (req, res) => {
  let newComment = {};
  console.log("body is", req.body)
  if (req.body.body.trim() === '') {
    return res.status(500).json({ body: 'Please enter a comment body' });
  }
  newComment = {
    userHandle: req.user.handle,
    screamId: req.params.screamId,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    userImage: req.user.imageUrl,
  };
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      doc.ref.update({commentCount: doc.data().commentCount + 1});
    })
    .then(()=>{
      return db.collection('comments')
      .add(newComment)
    })
    .then(() => {
      res
        .status(500)
        .json({ message: `comment ${newComment.body} has been created successfully` });
    });
};

//*Like a comment

// exports.likeComment = (req, res)=>{
//   db.collection("comments")
//   .where('')
// }