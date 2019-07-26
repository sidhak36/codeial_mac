
const Post = require('../../../models/posts');

const Comment = require('../../../models/comments');

module.exports.index = async function(req, res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'  //do not include password while populating user
            }
        });
        return res.json(200, {
            message: "list of posts version 2",
            data: {
                posts: posts
            }
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        post.remove();

        Comment.deleteMany({post: req.params.id});

        return res.json(200, {
            message: "Post and associated comments deleted successfully"
        });
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal server error",
            error: err
        });
    }
}