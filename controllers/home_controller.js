
const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/userSchema');
module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log('Error occured while displaying all posts');
            return;
        }
        User.find({}, function(err, users){
            if(err){
                console.log('Error occured while finding all users');
                return;
            }

            return res.render('home', {
                title : "Home Page",
                posts: posts,
                all_users: users
            });
        });
        
    });
    
}




