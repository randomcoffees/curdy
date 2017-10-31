const express = require('express');
const PaginationController = require('./pagination.controller');
const router = express.Router();

const curdy = require('./../../../../../../index');

router.use('/', curdy.generateRoutes(PaginationController));

module.exports = router;
