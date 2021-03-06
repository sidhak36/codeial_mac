
//Instance of User model in the database
const User = require('../models/userSchema');
const fs = require('fs');
const path = require('path');

module.exports.profilePage = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        if(user){

            let users = await User.find({});
            return res.render('user_profile', {
                title: 'User profile',
                profile_user: user,
                all_users: users
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
            // //Update the user information
            // let user = await User.findByIdAndUpdate(req.params.id, req.body);
            // req.flash('success', 'Information updated successfully');
            // return res.redirect('back');

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('******Multer Error: ', err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){ 
                        const filePath = path.join(__dirname, '..', user.avatar);
                        if(fs.existsSync(filePath)){ //checks if file is present at filePath
                            fs.unlinkSync(filePath); //deletes file synchronously at filePath
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Information updated successfully');
                return res.redirect('back');
            });
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
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
        req.flash('error', 'Confirm password does not match original');
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
    
        if(user){
            req.flash('error', 'Account already exists');
            return res.redirect('back');
        }else{
            let user = await User.create(req.body);
            req.flash('success', 'Successfully created account');
            return res.redirect('/users/sign-in');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}


//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Successfully logged in');
    return res.redirect('/');
}


//sign out
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Successfully logged out');
    return res.redirect('/users/sign-in');
}