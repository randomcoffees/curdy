require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const showAll = require('./../../../../lib/showAll');

describe('curdy.showAll.render', () => {
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

        this.showAll = showAll.render.method(
          this.SimpleModel,
          'simpleModels',
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
          json: Q.when
        };
      });
    });

    it('must render', () => {
      const req = {
        simpleModels: [this.simpleModel, this.simpleModel],
      };

      return this.showAll(req, this.res)
      .then(json => {
        expect(json[0].string).to.equal(this.simpleModel.string);
        expect(json[0].number).to.equal(this.simpleModel.number);
        expect(json[0].boolean).to.equal(this.simpleModel.boolean);
        expect(json[1].string).to.equal(this.simpleModel.string);
        expect(json[1].number).to.equal(this.simpleModel.number);
        expect(json[1].boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });
});