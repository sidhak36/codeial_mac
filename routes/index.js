
const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

const passport = require('passport');

// Middleware - Handles the path /users/....
router.use('/users', require('./users'));

// Middleware - Handles the path /post/....
router.use('/posts', require('./posts'));

//Handles all the /.... paths
router.get('/', homeController.home);

module.exports = router;

