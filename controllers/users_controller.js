
//Instance of User model in the database
const User = require('../models/userSchema');

module.exports.profilePage = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        if(user){
            return res.render('user_profile', {
                title: 'User profile',
                profile_user: user
            });
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error occurred... ${err}`);
        return;
    }
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            //Update the user information
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized Request');
        }
    }catch(err){
        console.log(`Error occurred... ${err}`);
        return;
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

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
    
        if(user){
            return res.redirect('back');
        }else{
            let user = await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
    }catch(err){
        console.log(`Error occurred... ${err}`);
        return;
    }
    
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