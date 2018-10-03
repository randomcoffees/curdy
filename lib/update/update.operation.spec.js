require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const NestedModel = require('../../spec/models/nestedModel.model');
const update = require('.');
const utilities = require('../utilities');


describe('curdy.update.operation', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.update = update.operation.method(
        SimpleModel,
        'simpleModel',
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
        simpleModel: this.simpleModel,
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
        expect(simpleModel.number).to.equal(42);
        expect(simpleModel.boolean).to.equal(true);
      });
    });

    it('must update a simple model via params', () => {
      const req = {
        simpleModel: this.simpleModel,
        params:{
          number: 84
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        return SimpleModel.findById(this.simpleModel._id);
      })
      .then((simpleModel) => {
        expect(simpleModel.string).to.equal('string');
        expect(simpleModel.number).to.equal(84);
        expect(simpleModel.boolean).to.equal(true);
      });
    });

    it('must create a simple model via other req objects', () => {
      const req = {
        simpleModel: this.simpleModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        return SimpleModel.findById(this.simpleModel._id);
      })
      .then((simpleModel) => {
        expect(simpleModel.string).to.equal('string');
        expect(simpleModel.number).to.equal(42);
        expect(simpleModel.boolean).to.equal(false);
      });
    });
  });

  describe('nested models', () => {
    beforeEach(() => {
      this.update = update.operation.method(
        NestedModel,
        'nestedModel',
        {
          parent: {
            string: 'body.parent.string',
            number: 'params.number',
            boolean: 'otherRequestObjects.boolean'
          }
        }
      );

      return NestedModel.create({
        parent: {
          string: 'string',
          number: 42,
          date: Date.now(),
          boolean: true
        }
      })
      .then((nestedModel) => {
        this.nestedModel = nestedModel;
      });
    });

    it('must update a simple model via body', () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          parent: {
            string: 'not string'
          }
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        return NestedModel.findById(this.nestedModel._id);
      })
      .then((nestedModel) => {
        expect(nestedModel.parent.string).to.equal('not string');
        expect(nestedModel.parent.number).to.equal(42);
        expect(nestedModel.parent.boolean).to.equal(true);
      });
    });

    it('must update a simple model via params', () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          number: 84
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        return NestedModel.findById(this.nestedModel._id);
      })
      .then((nestedModel) => {
        expect(nestedModel.parent.string).to.equal('string');
        expect(nestedModel.parent.number).to.equal(84);
        expect(nestedModel.parent.boolean).to.equal(true);
      });
    });

    it('must create a simple model via other req objects', () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        return NestedModel.findById(this.nestedModel._id);
      })
      .then((nestedModel) => {
        expect(nestedModel.parent.string).to.equal('string');
        expect(nestedModel.parent.number).to.equal(42);
        expect(nestedModel.parent.boolean).to.equal(false);
      });
    });
  });
});