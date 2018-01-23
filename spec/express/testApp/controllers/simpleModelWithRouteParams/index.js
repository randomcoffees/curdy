const express = require('express');
const Controller = require('./simpleModelWithRouteParams.controller');
const router = express.Router();

const curdy = require('./../../../../../index');

router.use('/:string', curdy.generateRoutes(Controller));

module.exports = router;
