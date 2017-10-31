require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const create = require('./../../../../lib/create');

describe('curdy.create.operation', () => {
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

        this.create = create.operation.method(
          this.SimpleModel,
          'simpleModel',
          {
            string: 'body.string',
            number: 'params.number',
            boolean: 'otherRequestObjects.boolean'
          }
        );
      });
    });

    it('must create a simple model via body', () => {
      const req = {
        body:{
          string: 'string'
        }
      };

      return this.create(req, null, Q.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return this.SimpleModel.findById(req.simpleModel._id);
      })
      .then(simpleModel => {
        expect(simpleModel.string).to.equal('string');
      });
    });

    it('must create a simple model via params', () => {
      const req = {
        params:{
          number: 42
        }
      };

      return this.create(req, null, Q.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return this.SimpleModel.findById(req.simpleModel._id);
      })
      .then(simpleModel => {
        expect(simpleModel.number).to.equal(42);
      });
    });

    it('must create a simple model via other req objects', () => {
      const req = {
        otherRequestObjects:{
          boolean: true
        }
      };

      return this.create(req, null, Q.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return this.SimpleModel.findById(req.simpleModel._id);
      })
      .then(simpleModel => {
        expect(simpleModel.boolean).to.equal(true);
      });
    });
  });
});