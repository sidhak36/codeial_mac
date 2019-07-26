

const express = require('express');

const router = express.Router();

router.get('/', require('../../../controllers/api/v2/posts_api').index);

router.delete('/:id', require('../../../controllers/api/v2/posts_api').destroy)

module.exports = router;