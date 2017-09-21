const express = require('express');
const Controller = require('./simpleModel.controller');
const router = express.Router();

const curddy = require('./../../../../../index');

router.use('/', curddy.generateRoutes(Controller));

module.exports = router;
