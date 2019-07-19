
const Post = require('../models/posts');

module.exports.home = function(req, res){
    Post.find({}).populate('user').exec(function(err, posts){
        if(err){
            console.log('Error occured while displaying all posts');
            return;
        }
        return res.render('home', {
            title : "Home Page",
            posts: posts
        });
    });
    
}




