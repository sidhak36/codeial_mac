
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const schema = new mongoose.Schema({
    email : {
        type : 'String',
        required : true,
        unique: true
    },
    password : {
        type : 'String',
        required : true
    },
    name : {
        type : 'String',
        required : true
    },
    avatar : {
        type: String
    }
}, {timestamps: true});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//.single method takes the field name
schema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
//uploadedAvatar is now contains a function definition that takes 3 arguments: req, res and callback
//It processes req and provides a file property to req upon execution. Thus req now contains a prop file
//This req.file can be accessed in callback
schema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', schema);


module.exports = User;