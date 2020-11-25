const { db } = require("../../../utilities/admin");

exports.sendMessage = (req, res) => {
  const sender = req.user.handle;
  const senderDoc = db.doc(`users/${sender}`);
  const newMessage = {
    sender,
    body: req.body.body,
    recipient: req.params.recipient,
    sentAt: new Date().toISOString(),
    read: false,
    readAt: null,
  };
  db.collection("messages")
    .add(newMessage)
    .then((doc) => {
      msg = newMessage;
      msg.messageId = doc.id;
      senderDoc.get().then((doc) => {
        msg.senderImage = doc.data().imageUrl;
      });
      doc.update(msg);
      return res.status(200).json(msg);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getMessages = (req, res) => {
  const handle = req.user.handle;
  db.collection("messages")
    .where("recipient", "==", handle)
    .limit(10)
    .get()
    .then((data) => {
      let messages = [];
      data.forEach((doc) => {
        messages.push({
          sender: doc.data().sender,
          body: doc.data().body,
          recipient: doc.data().recipient,
          sentAt: doc.data().sentAt,
          read: doc.data().read,
          readAt: doc.data().readAt,
          senderImage: doc.data().senderImage,
        });
      });
      return res.status(200).json(messages);
    })
    .catch((err) => {
      console.error(err);
    });
};
exports.getFriends = (req, res) => {
  const user = req.user.handle;
  db.collection("users").orderBy("createdAt", "desc").limit(10)
    .get()
    .then((data) => {
      let friends = [];
      data.forEach((doc) => {
    friends.push(doc.data())
      })
      return res.status(200).json(friends);
    })
    .catch((err) => {
      console.error(err);
    });
};
exports.getOneConversation = (req, res) => {
  const friend = req.params.friendId;
  const user = req.user.handle;
   db.collection("messages")
    .where("recipient", "==", user)
    .where("sender", "==", friend)
    .orderBy("sentAt", "desc")
    .get()
    .then((data) => {
        let messages = []
      data.forEach((doc) => {
        messages.push({
          sender: doc.data().sender,
          body: doc.data().body,
          recipient: doc.data().recipient,
          sentAt: doc.data().sentAt,
          read: doc.data().read,
          readAt: doc.data().readAt,
          senderImage: doc.data().senderImage,
        });
      });
      console.log(messages)
      return messages;
    }).
    then((messages)=>{
       db.collection("messages")
        .where("sender", "==", user)
        .where("recipient", "==", friend)
        .orderBy("sentAt", "desc")
        .get()
        .then((data) => {
          data.forEach((doc) => {
            messages.push({
              sender: doc.data().sender,
              body: doc.data().body,
              recipient: doc.data().recipient,
              sentAt: doc.data().sentAt,
              read: doc.data().read,
              readAt: doc.data().readAt,
              senderImage: doc.data().senderImage,
            });
      });
      console.log(messages)
      messages.sort((a, b) => a.sentAt - b.sentAt);
      
      return res.status(200).json(messages);
    });

    })
    .catch((error) => {
      console.error(error);
    });
};
exports.addFriend = (req, res) => {};


// const unique = (arrary)=>{
//   arrary.forEach((obj, index)=>{
//     if(obj.recipient)
//   })
// }
