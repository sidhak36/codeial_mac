
module.exports.profilePage = function(req, res){
    return res.render('user_profile', {
        title : "User's Profile"
    });
}

module.exports.info = function(req, res){
    return res.end('<h1>This is the info of the user</h1>');
}