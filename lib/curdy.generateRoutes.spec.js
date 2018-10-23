require('../spec/helpers');
const chai = require('chai');
const expect = chai.expect;
const curdy = require('./curdy');
const SimpleModel = require('../spec/models/simpleModel.model');

describe('curdy.generateRoutes.spec', () => {
  describe('router options', () => {
    it('should allow router options to be passed  as false', () => {
      const routerOpts = {
        caseSensitive: false,
        mergeParams: false,
        strict: false,
      };
      const router = curdy.generateRoutes(
        curdy.generateController(SimpleModel, {}).controller(),
        {},
        ':_id',
        routerOpts
      );

      expect(router.caseSensitive).to.equal(routerOpts.caseSensitive);
      expect(router.mergeParams).to.equal(routerOpts.mergeParams);
      expect(router.strict).to.equal(routerOpts.strict);
    });

    it('should allow router options to be passed  as true', () => {
      const routerOpts = {
        caseSensitive: true,
        mergeParams: true,
        strict: true,
      };
      const router = curdy.generateRoutes(
        curdy.generateController(SimpleModel, {}).controller(),
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
