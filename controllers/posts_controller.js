
const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.createPost = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    user_name: req.user.name
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post created successfully');
        return res.redirect('/');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
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

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: 'Post deleted'
                    });
                }

                req.flash('success', 'Post and associated comments deleted successfully');
                return res.redirect('back');
            }else{
                return res.status(401).send('Unauthorized');
            }
        }else{
            req.flash('error', 'Post not found');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}