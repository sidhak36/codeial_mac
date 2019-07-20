
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

module.exports.destroyComment = function(req, res){
    Comment.findById(req.params.id).populate('post').exec(function(err, comment){
        if(err){
            console.log('An error occured while finding comment');
            return;
        }

        if(comment){
            if(req.user.id == comment.user || req.user.id == comment.post.user){
                let postId = comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, 
                    function(err, post){
                        if(err){
                            console.log('Error occured while removing comment from post');
                            return;
                        }
                        return res.redirect('back');
                    });
            }else{
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
    });
}