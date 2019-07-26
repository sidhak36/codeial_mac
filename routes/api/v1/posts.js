

const express = require('express');

const router = express.Router();

router.get('/', require('../../../controllers/api/v1/posts_api').index);

module.exports = router;