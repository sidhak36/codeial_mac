
const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.createComment = function(req, res){
    Post.findById(req.body.post_id, function(err, post){
        if(err){
            console.log('An error occured while finding post by post_id');
            return;
        }

        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post_id
            }, function(err, comment){
                if(err){
                    console.log('An error occured while creating comment');
                    return;
                }
                post.comments.push(comment._id); //post is updated but still in the ram
                post.save(); //Updated post gets saved in database

                return res.redirect('back');
            });
        }
    })
}