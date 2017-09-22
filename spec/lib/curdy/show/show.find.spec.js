require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const curdy = require('./../../../../lib/curdy');

describe('curdy.show.find', () => {
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

        this.show = curdy.show.find(
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
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.show(req, this.res)
      .then(() => {
        expect(req.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
      });
    });

    describe('errors', () => {
      it('must handle bad mongoose ids', () => {
        const req = {
          params: {
            _id: '404MePlease'
          }
        };

        return this.show(req, null, Q.when)
        .then((err) => {
          expect(err.name).to.equal('CastError');
        });
      });

      it('must call next with an error when the model is not found', () => {
        const req = {
          params: {
            _id: new mongoose.Types.ObjectId()
          }
        };

        return this.show(req, null, Q.when)
        .then((err) => {
          expect(err).to.deep.equal({
            message: `${this.SimpleModel.modelName} not found`,
            name: 'NotFound',
            code: 404,
            modelName: this.SimpleModel.modelName
          });
        });
      });
    });
  });
});