require('./../../../helpers');

const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const showAll = require('./../../../../lib/showAll');

describe('curdy.showAll.find', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.showAll = showAll.find.method(
          SimpleModel,
          'simpleModels',
          {}
        );
      })
      .then(() => {
        return SimpleModel.remove({});
      })
      .then(() => {
        return Q.all([
          SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          })
        ]);
      })
      .then(simpleModels => {
        this.simpleModels = simpleModels;
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find', () => {
      const req = {
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(2);
        const simpleModelIds = [
          req.simpleModels[0]._id.toString(),
          req.simpleModels[1]._id.toString(),
        ];
        expect(simpleModelIds).to.contain(this.simpleModels[0]._id.toString());
        expect(simpleModelIds).to.contain(this.simpleModels[1]._id.toString());
      });
    });
  });

  describe('a complex find', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.showAll = showAll.find.method(
          SimpleModel,
          'simpleModels',
          {
            number: {
              $gt: 'params.number'
            }
          }
        );
      })
      .then(() => {
        return SimpleModel.remove({});
      })
      .then(() => {
        return Q.all([
          SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          SimpleModel.create({
            string: 'string',
            number: 41,
            date: Date.now(),
            boolean: true
          }),
          SimpleModel.create({
            string: 'string',
            number: 41,
            date: Date.now(),
            boolean: true
          })
        ]);
      })
      .then(simpleModels => {
        this.simpleModels = simpleModels;
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find everything greater than 41', () => {
      const req = {
        params: {
          number: 41
        }
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(2);
        const simpleModelIds = [
          req.simpleModels[0]._id.toString(),
          req.simpleModels[1]._id.toString(),
        ];
        expect(simpleModelIds).to.contain(this.simpleModels[0]._id.toString());
        expect(simpleModelIds).to.contain(this.simpleModels[1]._id.toString());
      });
    });

    it('must find everything greater than 0', () => {
      const req = {
        params: {
          number: 0
        }
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(4);

        const simpleModelIds = [
          req.simpleModels[0]._id.toString(),
          req.simpleModels[1]._id.toString(),
          req.simpleModels[2]._id.toString(),
          req.simpleModels[3]._id.toString(),
        ];
        expect(simpleModelIds).to.contain(this.simpleModels[0]._id.toString());
        expect(simpleModelIds).to.contain(this.simpleModels[1]._id.toString());
        expect(simpleModelIds).to.contain(this.simpleModels[2]._id.toString());
        expect(simpleModelIds).to.contain(this.simpleModels[3]._id.toString());
      });
    });
  });
});