const express = require('express');
const Controller = require('./simpleModel.controller');
const router = express.Router();

const curdy = require('./../../../../../index');

router.use('/', curdy.generateRoutes(Controller));

module.exports = router;
