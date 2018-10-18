require('../../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const NestedModel = require('../../../spec/models/nestedModel.model');
const update = require('./..');
const utilities = require('../../utilities');

describe('update.operation.nestedModel.spec', () => {
  beforeEach(async () => {
    this.update = update.operation.method(
      NestedModel,
      'nestedModel',
      {
        string: 'body.string',
        number: 'params.number',
        boolean: 'otherRequestObjects.boolean',
        child: {
          string: 'body.child.string',
          number: 'params.childNumber',
          boolean: 'otherRequestObjects.childBoolean',
          child: {
            string: 'body.child.child.string',
            number: 'params.childChildNumber',
            boolean: 'otherRequestObjects.childChildBoolean'
          }
        }
      }
    );

    const date = Date.now();
    this.nestedModel = await NestedModel.create({
      string: 'string',
      number: 42,
      date,
      boolean: true,
      child: {
        string: 'string',
        number: 42,
        date,
        boolean: true,
        child: {
          string: 'string',
          number: 42,
          date,
          boolean: true
        }
      }
    });

    const nestedModelJson = this.nestedModel.toJSON();

    this.nestedModelObject = {
      _id: nestedModelJson._id,
      __v: 0,
      string: null,
      number: null,
      date: nestedModelJson.date,
      boolean: null,
      child: {
        string: null,
        number: null,
        date: nestedModelJson.date,
        boolean: null,
        child: { string: null,
          number: null,
          date: nestedModelJson.date,
          boolean: null,
        },
      },
      createdAt: nestedModelJson.createdAt
    };
  });

  describe('root path', () => {
    it('must update a simple model via body', async () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          string: 'not string'
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must update a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          number: 84
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });

  describe('child path', () => {
    it('must update a simple model via body', async () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          child: {
            string: 'not string'
          }
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must update a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          childNumber: 84
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          childBoolean: false
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });

  describe('child.child path', () => {
    it('must update a simple model via body', async () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          child: {
            child: {
              string: 'not string'
            }
          }
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must update a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          childChildNumber: 84
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          childChildBoolean: false
        }
      };

      await this.update(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      delete this.nestedModelObject.child.child.date;
      delete this.nestedModelObject.child.date;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });
});