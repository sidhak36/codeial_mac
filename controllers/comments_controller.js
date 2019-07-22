
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
            post.comments.push(comment._id); //post is updated but still in the ram
            post.save(); //Updated post gets saved in database
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