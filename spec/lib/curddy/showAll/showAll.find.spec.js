require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const curddy = require('./../../../../lib/curddy');

describe('curddy.showAll.find', () => {
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

        this.showAll = curddy.showAll.find(
          this.SimpleModel,
          'simpleModels',
          {}
        );
      })
      .then(() => {
        return this.SimpleModel.remove({});
      })
      .then(() => {
        return Q.all([
          this.SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          this.SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          })
        ]);
      })
      .then(simpleModels => {
        this.simpleModels = simpleModels;
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find', () => {
      const req = {
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(2);
        expect(req.simpleModels[0]._id.toString()).to.equal(this.simpleModels[0]._id.toString());
        expect(req.simpleModels[1]._id.toString()).to.equal(this.simpleModels[1]._id.toString());
      });
    });
  });

  describe('a complex find', () => {
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

        this.showAll = curddy.showAll.find(
          this.SimpleModel,
          'simpleModels',
          {
            number: {
              $gt: 'params.number'
            }
          }
        );
      })
      .then(() => {
        return this.SimpleModel.remove({});
      })
      .then(() => {
        return Q.all([
          this.SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          this.SimpleModel.create({
            string: 'string',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          this.SimpleModel.create({
            string: 'string',
            number: 41,
            date: Date.now(),
            boolean: true
          }),
          this.SimpleModel.create({
            string: 'string',
            number: 41,
            date: Date.now(),
            boolean: true
          })
        ]);
      })
      .then(simpleModels => {
        this.simpleModels = simpleModels;
        this.res = {
          json: Q.when
        };
      });
    });

    it('must find everything greater than 41', () => {
      const req = {
        params: {
          number: 41
        }
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(2);
        expect(req.simpleModels[0]._id.toString()).to.equal(this.simpleModels[0]._id.toString());
        expect(req.simpleModels[1]._id.toString()).to.equal(this.simpleModels[1]._id.toString());
      });
    });

    it('must find everything greater than 0', () => {
      const req = {
        params: {
          number: 0
        }
      };

      return this.showAll(req, this.res)
      .then(() => {
        expect(req.simpleModels.length).to.equal(4);
        expect(req.simpleModels[0]._id.toString()).to.equal(this.simpleModels[0]._id.toString());
        expect(req.simpleModels[1]._id.toString()).to.equal(this.simpleModels[1]._id.toString());
        expect(req.simpleModels[2]._id.toString()).to.equal(this.simpleModels[2]._id.toString());
        expect(req.simpleModels[3]._id.toString()).to.equal(this.simpleModels[3]._id.toString());
      });
    });
  });
});