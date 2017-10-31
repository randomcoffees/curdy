const express = require('express');
const router = express.Router();

router.use('/orderBy', require('./orderBy'));
router.use('/pagination', require('./pagination'));

module.exports = router;