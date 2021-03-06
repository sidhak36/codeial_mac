
const passport = require('passport');

const LocalSrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

const strategy = new LocalSrategy({
    usernameField : 'email',
    passReqToCallback: true
}, async function(req, email, password, done){
    try{
        //find a user and establish the identity
        let user = await User.findOne({email: email});
        //If user isn't found(ie wrong email) or password is wrong
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    }catch(err){
        req.flash('error', err);
        return done(err);
    }
});

//authentication using passport
passport.use(strategy);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //The user here is found by passport.use method above
    //Now we serialize the user by storing user id in cookie and passport encrypts it automatically and sends it to browser
    return done(null, user.id);
});

//deserializing the user from the key(user id) in the cookie
passport.deserializeUser(async function(userId, done){
    try{
        let user = await User.findById(userId);
        if(!user){
            console.log('Invalid credentials');
            return done(null, false);
        }
        return done(null, user);
    }catch(err){
        console.log('Error in deserializing the user --> Passport');
        return done(err);
    }

});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //If the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //If the user isn't signed in
    return res.redirect('/users/sign-in');
}

//check if the user is not authenticated
passport.checkNotAuthenticated = function(req, res, next){
    //If the user is not signed in, then pass on the request to the next function(controller's action)
    if(!req.isAuthenticated()){
        return next();
    }

    //If the user is signed in
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;