const express = require('express');
const RegressionController = require('./orderByRegression.controller');
const AscendingController = require('./orderByAscending.controller');
const DescendingController = require('./orderByDescending.controller');
const router = express.Router();

const curdy = require('./../../../../../../index');

router.use('/regression/', curdy.generateRoutes(RegressionController));
router.use('/ascending/', curdy.generateRoutes(AscendingController));
router.use('/descending/', curdy.generateRoutes(DescendingController));

module.exports = router;
