require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const showAll = require('.');
const utilities = require('../utilities');

describe('curdy.showAll.render', () => {
  beforeEach(() => {
    return SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true
    })
    .then((simpleModel) => {
      this.simpleModel = simpleModel;
      this.res = {
        status: () => {return this.res;},
        json: utilities.when
      };
    });
  });

  describe('simple models', () => {
    beforeEach(() => {
      this.showAll = showAll.render.method(
        SimpleModel,
        'simpleModels',
        {
          string: 'string',
          number: 'number',
          boolean: 'boolean'
        }
      );
    });

    it('must render', () => {
      const req = {
        simpleModels: [this.simpleModel, this.simpleModel],
      };

      return this.showAll(req, this.res)
      .then((json) => {
        expect(json.simpleModels[0].string).to.equal(this.simpleModel.string);
        expect(json.simpleModels[0].number).to.equal(this.simpleModel.number);
        expect(json.simpleModels[0].boolean).to.equal(this.simpleModel.boolean);
        expect(json.simpleModels[1].string).to.equal(this.simpleModel.string);
        expect(json.simpleModels[1].number).to.equal(this.simpleModel.number);
        expect(json.simpleModels[1].boolean).to.equal(this.simpleModel.boolean);
      });
    });

    it('must render allow functions to access the req', () => {
      const req = {
        simpleModels: [this.simpleModel, this.simpleModel],
        reqValue: 42
      };

      this.showAll = showAll.render.method(
        SimpleModel,
        'simpleModels',
        {
          _id: ({ object }) => {return object._id;},
          reqValue: ({ templateOpts }) => {return templateOpts.req.reqValue;}
        }
      );

      return this.showAll(req, this.res)
      .then((json) => {
        expect(json.simpleModels[0]._id).to.equal(this.simpleModel._id);
        expect(json.simpleModels[0].reqValue).to.equal(req.reqValue);
        expect(json.simpleModels[1]._id).to.equal(this.simpleModel._id);
        expect(json.simpleModels[1].reqValue).to.equal(req.reqValue);
      });
    });
  });
});