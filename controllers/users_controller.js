
//Instance of Users model in the database
const Users = require('../models/userSchema');

module.exports.profilePage = function(req, res){

    if(req.cookies.user_id){
        //Handle user signed in
        Users.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('An error occured while finding user by id');
                return;
            }

            //Handle user found
            if(user){
                return res.render('user_profile', {
                    title : "User's Profile",
                    user: user
                });
            }
            //Handle user not found
            return res.redirect('/users/sign-in');
        });
    }else{
        //Handle user not signed in
        return res.redirect('/users/sign-in');
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

    Users.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('An error occured while finding user during signup');
            return;
        }

        if(user){
            return res.redirect('back');
        }
        Users.create(req.body, function(err, user){
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
    
    //find the user
    Users.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('An error occured while finding user during sign in');
            return;
        }

        //handle user found
        if(user){
            //handle password which don't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }
    });
}

module.exports.signOut = function(req, res){
    res.cookie('user_id', "");
    return res.redirect('/users/sign-in');
}