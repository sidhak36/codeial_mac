
const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');


// Middleware - Handles the path /users/....
router.use('/users', require('./users'));


//Handles all the /.... paths
router.get('/', homeController.home);

module.exports = router;

