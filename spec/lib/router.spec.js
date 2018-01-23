require('./../helpers');
const chai = require('chai');
const expect = chai.expect;
const curdy = require('../../lib/curdy');
const SimpleModel = require('../models/simpleModel.model');

describe('router.spec', () => {
  describe('router options', () => {
    it('should allow router options to be passed in', () => {
      const routerOpts = {
        caseSensitive: false,
        mergeParams: true,
        strict: false,
      };
      const router = curdy.generateRoutes(
        curdy.generateController(SimpleModel, 'SimpleModel', {}).controller(),
        {},
        ':_id',
        routerOpts
      );

      expect(router.caseSensitive).to.equal(routerOpts.caseSensitive);
      expect(router.mergeParams).to.equal(routerOpts.mergeParams);
      expect(router.strict).to.equal(routerOpts.strict);
    });
  });
});
