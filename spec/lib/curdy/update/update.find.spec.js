require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const update = require('./../../../../lib/update');

describe('curdy.update.find', () => {
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

        this.update = update.find.method(
          this.SimpleModel,
          'simpleModel',
          {
            _id: 'params._id'
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

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.update(req, null, Q.when)
      .then(() => {
        expect(req.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
        expect(req.simpleModel.string).to.equal(this.simpleModel.string);
        expect(req.simpleModel.number).to.equal(this.simpleModel.number);
        expect(req.simpleModel.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });
});