require('./../../../helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const _delete = require('./../../../../lib/delete');
const utilities = require('./../../../../lib/utilities');

describe('curdy.delete.operation', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.delete = _delete.operation.method(
        SimpleModel,
        'simpleModel',
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
        simpleModel: this.simpleModel
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