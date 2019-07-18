
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

const passport = require('passport');

// Middleware - Handles the path /users/posts/....  
router.use('/posts', require('./posts'));




//Handles all the /users/.... paths
router.get('/profile', passport.checkAuthentication, usersController.profilePage);

router.get('/info', usersController.info);

router.get('/sign-up',passport.checkNotAuthenticated, usersController.signUp);

router.get('/sign-in',passport.checkNotAuthenticated, usersController.signIn);


router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

//sign out
router.get('/sign-out', usersController.destroySession);

module.exports = router;