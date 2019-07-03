
module.exports.profilePage = function(req, res){
    return res.end('<h1>this is the profile page</h1>');
}

module.exports.info = function(req, res){
    return res.end('<h1>This is the info of the user</h1>');
}