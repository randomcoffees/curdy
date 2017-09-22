require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const curddy = require('./../../../../lib/curddy');

describe('curddy.delete.operation', () => {
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

        this.delete = curddy.delete.operation(
          this.SimpleModel,
          'simpleModel',
          {
            string: 'body.string',
            number: 'params.number',
            boolean: 'otherRequestObjects.boolean'
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
      });
    });

    it('must delete a simple model', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.delete(req, null, Q.when)
      .then(() => {
        return this.SimpleModel.count({_id: this.simpleModel._id});
      })
      .then(simpleModelCount => {
        expect(simpleModelCount).to.equal(0);
      });
    });
  });
});