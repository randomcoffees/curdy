require('./../../../helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const create = require('./../../../../lib/create');
const utilities = require('../../../../lib/utilities');

describe('curdy.create.operation', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      this.create = create.operation.method(
        SimpleModel,
        'simpleModel',
        {
          string: 'body.string',
          number: 'params.number',
          boolean: 'otherRequestObjects.boolean'
        }
      );
    });

    it('must create a simple model via body', () => {
      const req = {
        body:{
          string: 'string'
        }
      };
      return this.create(req, null, utilities.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return SimpleModel.findById(req.simpleModel._id);
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

      return this.create(req, null, utilities.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return SimpleModel.findById(req.simpleModel._id);
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

      return this.create(req, null, utilities.when)
      .then(() => {
        expect(req.simpleModel._id).to.exist;
        return SimpleModel.findById(req.simpleModel._id);
      })
      .then(simpleModel => {
        expect(simpleModel.boolean).to.equal(true);
      });
    });
  });
});