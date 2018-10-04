require('../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const update = require('.');
const utilities = require('../utilities');


describe('update.operation.simpleModel.spec', () => {
  beforeEach(() => {
    this.update = update.operation.method(
      SimpleModel,
      'curdy.simpleModel',
      {
        string: 'body.string',
        number: 'params.number',
        boolean: 'otherRequestObjects.boolean'
      }
    );

    return SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true
    })
    .then((simpleModel) => {
      this.simpleModel = simpleModel;
    });
  });

  it('must update a simple model via body', () => {
    const req = {
      curdy: {
        simpleModel: this.simpleModel
      },
      body:{
        string: 'not string'
      }
    };

    return this.update(req, null, utilities.when)
    .then(() => {
      return SimpleModel.findById(this.simpleModel._id);
    })
    .then((simpleModel) => {
      expect(simpleModel.string).to.equal('not string');
      expect(simpleModel.number).to.equal(null);
      expect(simpleModel.boolean).to.equal(null);
    });
  });

  it('must update a simple model via params', () => {
    const req = {
      curdy: {
        simpleModel: this.simpleModel
      },
      params:{
        number: 84
      }
    };

    return this.update(req, null, utilities.when)
    .then(() => {
      return SimpleModel.findById(this.simpleModel._id);
    })
    .then((simpleModel) => {
      expect(simpleModel.string).to.equal(null);
      expect(simpleModel.number).to.equal(84);
      expect(simpleModel.boolean).to.equal(null);
    });
  });

  it('must create a simple model via other req objects', () => {
    const req = {
      curdy: {
        simpleModel: this.simpleModel,
      },
      otherRequestObjects:{
        boolean: false
      }
    };

    return this.update(req, null, utilities.when)
    .then(() => {
      return SimpleModel.findById(this.simpleModel._id);
    })
    .then((simpleModel) => {
      expect(simpleModel.string).to.equal(null);
      expect(simpleModel.number).to.equal(null);
      expect(simpleModel.boolean).to.equal(false);
    });
  });
});