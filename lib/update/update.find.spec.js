require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const update = require('.');
const utilities = require('../utilities');

describe('curdy.update.find', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.update = update.find.method(
        SimpleModel,
        'curdy.simpleModel',
        {
          _id: 'params._id'
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

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        expect(req.curdy.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
        expect(req.curdy.simpleModel.string).to.equal(this.simpleModel.string);
        expect(req.curdy.simpleModel.number).to.equal(this.simpleModel.number);
        expect(req.curdy.simpleModel.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });
});