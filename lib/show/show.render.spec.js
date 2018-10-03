require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const show = require('.');
const utilities = require('../utilities');

describe('curdy.show.render', () => {
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
      this.show = show.render.method(
        SimpleModel,
        'simpleModel',
        {
          string: 'string',
          number: 'number',
          boolean: 'boolean'
        }
      );
    });

    it('must render', () => {
      const req = {
        simpleModel: this.simpleModel,
      };

      return this.show(req, this.res)
      .then((json) => {
        expect(json.string).to.equal(this.simpleModel.string);
        expect(json.number).to.equal(this.simpleModel.number);
        expect(json.boolean).to.equal(this.simpleModel.boolean);
      });
    });

    it('must render allow functions to access the req', () => {
      const req = {
        simpleModel: this.simpleModel,
        reqValue: 42
      };

      this.show = show.render.method(
        SimpleModel,
        'simpleModel',
        {
          _id: ({ object }) => {return object._id;},
          reqValue: ({ opts }) => {return opts.req.reqValue;}
        }
      );

      return this.show(req, this.res)
      .then((json) => {
        expect(json._id).to.equal(this.simpleModel._id);
        expect(json.reqValue).to.equal(req.reqValue);
      });
    });
  });
});