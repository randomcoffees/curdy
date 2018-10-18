require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const create = require('.');
const utilities = require('../utilities');

describe('curdy.create.render', () => {
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
      return this.create = create.render.method(
        SimpleModel,
        'curdy.simpleModel',
        {
          string: 'string',
          number: 'number',
          boolean: 'boolean'
        }
      );
    });

    it('must render', () => {
      const req = {
        curdy: {
          simpleModel: this.simpleModel
        }
      };

      return this.create(req, this.res)
      .then((json) => {
        expect(json.string).to.equal(this.simpleModel.string);
        expect(json.number).to.equal(this.simpleModel.number);
        expect(json.boolean).to.equal(this.simpleModel.boolean);
      });
    });

    it('must render allow functions to access the req', () => {
      const req = {
        curdy:{
          simpleModel: this.simpleModel
        },
        reqValue: 99
      };

      this.create = create.render.method(
        SimpleModel,
        'curdy.simpleModel',
        {
          _id: ({ object }) => {return object._id;},
          reqValue: ({ templateOpts }) => {return templateOpts.req.reqValue;}
        }
      );

      return this.create(req, this.res)
      .then((json) => {
        expect(json._id).to.equal(this.simpleModel._id);
        expect(json.reqValue).to.equal(req.reqValue);
      });
    });
  });
});