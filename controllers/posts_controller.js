
const Post = require('../models/posts');

module.exports.createPost = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('An error occured while saving user post in database');
            return;
        }
        return res.redirect('/');
    });
}

