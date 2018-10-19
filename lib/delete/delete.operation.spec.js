require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const _delete = require('.');
const utilities = require('../utilities');

describe('curdy.delete.operation', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.delete = _delete.operation.method(
        SimpleModel,
        'curdy.simpleModel',
        {
          string: 'body.string',
          number: 'params.number',
          boolean: 'otherRequestObjects.boolean'
        }
      );

      return SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      })
      .then((simpleModel) => {
        this.simpleModel = simpleModel;
      });
    });

    it('must delete a simple model', () => {
      const req = {
        curdy: {
          simpleModel: this.simpleModel
        }
      };

      return this.delete(req, null, utilities.when)
      .then(() => {
        return SimpleModel.count({ _id: this.simpleModel._id });
      })
      .then((simpleModelCount) => {
        expect(simpleModelCount).to.equal(0);
      });
    });
  });
});