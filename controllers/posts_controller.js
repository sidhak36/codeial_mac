
const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.createPost = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('/');
    }catch(err){
        console.log(`An error occurred.. ${err}`);
    }
}

module.exports.destroyPost = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
    
        if(post){
            //post.user returns a string id and so does req.user.id
            if(post.user == req.user.id){
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
            }else{
                console.log('You cannnot delete this post');
                return res.redirect('back');
            }
        }else{
            console.log('Post Not Found');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`An error occurred.. ${err}`);
    }
}