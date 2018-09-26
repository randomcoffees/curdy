require('./../../../helpers');

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const show = require('./../../../../lib/show');
const utilities = require('./../../../../lib/utilities');

describe('curdy.show.find', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      this.show = show.find.method(
        SimpleModel,
        'simpleModel',
        {
          _id: 'params._id'
        }
      );

      return SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      })
      .then(simpleModel => {
        this.simpleModel = simpleModel;
        this.res = {
          json: utilities.when
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

        return this.show(req, null, utilities.when)
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

        return this.show(req, null, utilities.when)
        .then((err) => {
          expect(err).to.deep.equal({
            message: `${SimpleModel.modelName} not found`,
            name: 'NotFound',
            code: 404,
            modelName: SimpleModel.modelName
          });
        });
      });
    });
  });
});