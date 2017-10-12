const express = require('express');
const router = express.Router();

router.use('/orderBy', require('./orderBy'));

module.exports = router;
