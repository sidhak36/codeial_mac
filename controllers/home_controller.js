

module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('home', {
        title : "Home Page"
    });
}

module.exports.signup = function(req, res){
    console.log(req.body);
    return res.redirect('back');
}

module.exports.login = function(req, res){
    console.log(req.body);
    return res.redirect('back');
}