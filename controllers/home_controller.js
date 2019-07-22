
const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/userSchema');


module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        
        let users = await User.find({});
        console.log(req.session);
        return res.render('home', {
            title : "Home Page",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log(`An error occured.. ${err}`);
        return;
    }
    
}




