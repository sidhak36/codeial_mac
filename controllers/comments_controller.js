
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
            return res.redirect('back');
        }
        return res.redirect('back');
    }catch(err){
        console.log('An error occurred.. ', err);
        return;
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
                return res.redirect('back');
            }
        }
        return res.redirect('back');
    }catch(err){
        console.log('An error occurred.. ', err);
        return;
    }
   
}