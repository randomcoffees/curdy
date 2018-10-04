require('../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const NestedModel = require('../../spec/models/nestedModel.model');
const patch = require('.');
const utilities = require('../utilities');

describe('patch.operation.nestedModel.spec', () => {
  beforeEach(async () => {
    this.patch = patch.operation.method(
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

    this.nestedModelObject = this.nestedModel.toJSON();
  });

  describe('root path', () => {
    it('must patch a simple model via body', async () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          string: 'not string'
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must patch a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          number: 84
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });

  describe('child path', () => {
    it('must patch a simple model via body', async () => {
      const req = {
        nestedModel: this.nestedModel,
        body:{
          child: {
            string: 'not string'
          }
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must patch a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          childNumber: 84
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          childBoolean: false
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });

  describe('child.child path', () => {
    it('must patch a simple model via body', async () => {
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

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.string = 'not string';
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must patch a simple model via params', async () => {
      const req = {
        nestedModel: this.nestedModel,
        params:{
          childChildNumber: 84
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.number = 84;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        nestedModel: this.nestedModel,
        otherRequestObjects:{
          childChildBoolean: false
        }
      };

      await this.patch(req, null, utilities.when);
      const nestedModel = await NestedModel.findById(this.nestedModel._id);

      this.nestedModelObject.child.child.boolean = false;
      this.nestedModelObject.updatedAt = nestedModel.updatedAt;
      expect(nestedModel.toJSON()).to.deep.equal(this.nestedModelObject);
    });
  });
});