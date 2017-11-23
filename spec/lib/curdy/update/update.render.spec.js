require('./../../../helpers');

const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const update = require('./../../../../lib/update');

describe('curdy.update.render', () => {
  beforeEach(() =>{
    return SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true
    })
    .then(simpleModel => {
      this.simpleModel = simpleModel;
      this.res = {
        status: () => {return this.res;},
        json: Q.when
      };
    });
  });

  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.update = update.render.method(
          SimpleModel,
          'simpleModel',
          {
            string: 'string',
            number: 'number',
            boolean: 'boolean'
          }
        );
      });
    });

    it('must render', () => {
      const req = {
        simpleModel: this.simpleModel,
      };

      return this.update(req, this.res)
      .then(json => {
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

      this.update = update.render.method(
        SimpleModel,
        'simpleModel',
        {
          _id: ({object}) => {return object._id;},
          reqValue: ({opts}) => {return opts.req.reqValue;}
        }
      );

      return this.update(req, this.res)
      .then(json => {
        expect(json._id).to.equal(this.simpleModel._id);
        expect(json.reqValue).to.equal(req.reqValue);
      });
    });
  });
});