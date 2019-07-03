
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

// Middleware - Handles the path /users/posts/....  
router.use('/posts', require('./posts'));




//Handles all the /users/.... paths
router.get('/profile', usersController.profilePage);

router.get('/info', usersController.info);

module.exports = router;