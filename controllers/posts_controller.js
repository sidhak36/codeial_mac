
const Post = require('../models/posts');
const Comment = require('../models/comments');
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

module.exports.destroyPost = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log('An error occured while finding post');
            return;
        }

        if(post){
            //post.user returns a string id and so does req.user.id
            if(post.user == req.user.id){
                post.remove();
                Comment.deleteMany({post: req.params.id}, function(err){
                    if(err){
                        console.log('Error occured while deleting comments associated with post');
                        return;
                    }
                    return res.redirect('back');
                });
            }else{
                console.log('You cannnot delete this post');
                return res.redirect('back');
            }
        }else{
            console.log('Post Not Found');
            return res.redirect('back');
        }
    });
}