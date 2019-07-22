
const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.createComment = async function(req, res){
    try{
        let post = await Post.findById(req.body.post_id);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post_id
            });
            //unshift adds a new comment at the start in comments array of post. Thus a new comment is seen first in home page
            post.comments.unshift(comment._id); //post is updated but still in the ram
            post.save(); //Updated post gets saved in database

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment,
                        user_name: req.user.name
                    },
                    message: 'Comment created!'
                });
            }

            req.flash('success', 'Successfully created comment');
            return res.redirect('back');
        }
        req.flash('error', "comment's post not found");
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroyComment = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id).populate('post');
        if(comment){
            if(req.user.id == comment.user || req.user.id == comment.post.user){
                let postId = comment.post;
                comment.remove();

                let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: 'Comment deleted'
                    });
                }

                req.flash('success', 'Successfully deleted comment');
                return res.redirect('back');
            }else{
                return res.status(401).send('Unauthorized');
            }
        }
        req.flash('error', 'Comment not found');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
   
}