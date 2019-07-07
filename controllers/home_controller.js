

module.exports.home = function(req, res){
    return res.render('home', {
        title : "Home Page"
    });
}

module.exports.contacts = function(req, res){
    return res.end('<h1>Contacts displayed here</h1>');
}