require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const curddy = require('./../../../../lib/curddy');

describe('curddy.render.delete', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.SimpleModel = mongoose.model('SimpleModel', new mongoose.Schema({
          string: String,
          number: Number,
          date: Date,
          boolean: Boolean
        }, {
          timestamps: false,
        }));

        this.delete = curddy.render.delete(
          this.SimpleModel,
          'simpleModel',
          {
            status: () => { return 'success'; }
          }
        );
      })
      .then(() => {
        return this.SimpleModel.create({
          string: 'string',
          number: 42,
          date: Date.now(),
          boolean: true
        });
      })
      .then(simpleModel => {
        this.simpleModel = simpleModel;
        this.res = {
          status: () => {return this.res;},
          json: Q.when
        };
      });
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
  });
});