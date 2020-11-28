const { db } = require("../../../utilities/admin");

exports.postComment = (req, res) => {
  let newComment = {};
  if (req.body.body.trim() === "") {
    return res.status(500).json({ body: "Please enter a comment body" });
  }
  newComment = {
    userHandle: req.user.handle,
    screamId: req.params.screamId,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    userImage: req.user.imageUrl,
  };
   db.collection("comments").add(newComment).then(doc=>{
    newComment.commentId = doc.id
return doc.update(newComment)
  })
  .then(()=>{
return db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "Not found" });
      doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then((data) => {
      return res.status(200).json(newComment);
    })
    .catch((err) => {
      console.error(err);
    });
  })
};

//*Like a comment

// exports.likeComment = (req, res)=>{
//   db.collection("comments")
//   .where('')
// }

exports.deleteComment = (req, res) => {
  const handle = req.user.handle;
  const commentId = req.params.commentId;

  db.doc(`/comments/${commentId}`)
    .get()
    .then((doc) => {
      if (doc.data().userHandle === handle) {
        if (doc.exists) {
          return doc.ref.delete()
          .then(() => {
            db.doc(`/screams/${doc.data().screamId}`)
              .get()
              .then((doc) => {
                const commentCount = doc.data().commentCount++;
                 doc.ref.update({ commentCount });
                 return res
                 .status(200)
                 .json({ message: "Comment deleted successfully" });     
              });
          });
        } else {
          return res.status(404).json({ error: "Comment already deleted!" });
        }
      } else {
        return res
          .status(403)
          .json({ error: "You are not allowed to delete others comments" });
      }
    });
};
