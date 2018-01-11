const express = require('express');
const RegressionController = require('./simpleSortRegression.controller');
const AscendingController = require('./simpleSortAscending.controller');
const DescendingController = require('./simpleSortDescending.controller');
const router = express.Router();

const curdy = require('./../../../../../../index');

router.use('/regression/', curdy.generateRoutes(RegressionController));
router.use('/ascending/', curdy.generateRoutes(AscendingController));
router.use('/descending/', curdy.generateRoutes(DescendingController));

module.exports = router;
