require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const curddy = require('./../../../../lib/curddy');

describe('curddy.render.create', () => {
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

        this.create = curddy.render.create(
          this.SimpleModel,
          'simpleModel',
          {
            string: 'string',
            number: 'number',
            boolean: 'boolean'
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

      return this.create(req, this.res)
      .then(json => {
        expect(json.string).to.equal(this.simpleModel.string);
        expect(json.number).to.equal(this.simpleModel.number);
        expect(json.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });
});