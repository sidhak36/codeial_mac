
//Instance of Users model in the database
const User = require('../models/userSchema');

module.exports.profilePage = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error while finding user');
            return;
        }

        if(user){
            return res.render('user_profile', {
                title: 'User profile',
                profile_user: user
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        //Update the user information
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if(err){
                console.log("An error occured while updating user's info");
                return;
            }
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized Request');
    }
}

module.exports.info = function(req, res){
    return res.end('<h1>This is the info of the user</h1>');
}


//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}


//get the sign up data

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('An error occured while finding user with specified email');
            return;
        }

        if(user){
            return res.redirect('back');
        }
        User.create(req.body, function(err, user){
            if(err){
                console.log('An error occured while creating the user');
                return;
            }
            return res.redirect('/users/sign-in');
        });
    });
    
}


//sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}


//sign out
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/users/sign-in');
}