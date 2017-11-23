require('./../../../helpers');

const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const _delete = require('./../../../../lib/delete');

describe('curdy.delete.find', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.delete = _delete.find.method(
          SimpleModel,
          'simpleModel',
          {
            _id: 'params._id'
          }
        );
      })
      .then(() => {
        return SimpleModel.create({
          string: 'string',
          number: 42,
          date: Date.now(),
          boolean: true
        });
      })
      .then(simpleModel => {
        this.simpleModel = simpleModel;
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.delete(req, this.res)
      .then(() => {
        expect(req.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
      });
    });
  });
});