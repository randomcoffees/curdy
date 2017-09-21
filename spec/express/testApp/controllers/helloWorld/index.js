const express = require('express');
const Controller = require('./helloWorld.controller');
const router = express.Router();

router.get('/', Controller.index);

module.exports = router;
