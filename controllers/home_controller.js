

module.exports.home = function(req, res){
    return res.end('<h1>Express is up for codeial</h1>');
}

module.exports.contacts = function(req, res){
    return res.end('<h1>Contacts displayed here</h1>');
}