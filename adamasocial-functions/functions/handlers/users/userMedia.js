const {config}= require('../../utilities/config');
const {admin, db} = require('../../utilities/admin');
const { uuid } = require("uuidv4");
exports.uploadImage = (req,res)=>{
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    let token = uuid()
    const busboy = new BusBoy ({headers:req.headers});
    console.log(req)
    let imageFileName;
    let imageToBeUploaded={};
    busboy.on('file', (fieldname, file, filename, encoding, mimetype)=>{
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random()*10000000000).toString()}`.concat('.',`${imageExtension}`);
        const filepath =path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', ()=> {
        admin.storage().bucket(config.storageBucket).upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype,
                    firebaseStorageDownloadTokens: token
                }
            }
        })
        .then(()=>{
  
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${token}`
            return db.doc(`/users/${req.user.handle}`).update({imageUrl})
        }
            
        )
        .then(()=>{
            return res.json({message: "Image updated successfully"})
        })
        .catch(err=> {
            res.status(500).json({ error: err.code})
        })
    });
    busboy.end(req.rawBody)
}