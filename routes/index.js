
const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

const passport = require('passport');

// Middleware - Handles the path /users/....
router.use('/users', require('./users'));

// Middleware - Handles the path /post/....
router.use('/posts', require('./posts'));

// Middleware - Handles the path /comment/....
router.use('/comments', require('./comments'));


//Middleware to handle api requests
router.use('/api', require('./api/index'));

//Handles all the /.... paths
router.get('/', homeController.home);

module.exports = router;

