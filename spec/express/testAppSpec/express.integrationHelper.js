require('./../../helpers');

const express = require( 'express' );

exports.beforeEach = (_this) => {
  _this.app = express();

  const router = require( './../testApp/routes' );

  router( _this.app );
};