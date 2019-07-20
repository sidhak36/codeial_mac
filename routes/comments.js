
const express = require('express');

const router = express.Router();

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create-comment',passport.checkAuthentication, commentsController.createComment);

router.get('/destroy/:id',passport.checkAuthentication, commentsController.destroyComment);

module.exports = router;