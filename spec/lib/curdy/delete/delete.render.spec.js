require('./../../../helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const _delete = require('./../../../../lib/delete');
const utilities = require('./../../../../lib/utilities');

describe('curdy.delete.render', () => {
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
        json: utilities.when
      };
    });
  });

  describe('simple models', () => {
    beforeEach(() =>{
      this.delete = _delete.render.method(
        SimpleModel,
        'simpleModel',
        {
          status: () => { return 'success'; }
        }
      );
    });

    it('must render', () => {
      const req = {
        simpleModel: this.simpleModel,
      };

      return this.delete(req, this.res)
      .then(json => {
        expect(json.status).to.equal('success');
      });
    });

    it('must render allow functions to access the req', () => {
      const req = {
        simpleModel: this.simpleModel,
        reqValue: 3.14159
      };

      this.delete = _delete.render.method(
        SimpleModel,
        'simpleModel',
        {
          _id: ({object}) => {return object._id;},
          reqValue: ({opts}) => {return opts.req.reqValue;},
          status: () => { return 'success'; }
        }
      );

      return this.delete(req, this.res)
      .then(json => {
        expect(json._id).to.equal(this.simpleModel._id);
        expect(json.reqValue).to.equal(req.reqValue);
      });
    });
  });
});