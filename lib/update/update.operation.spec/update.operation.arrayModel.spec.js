require('../../../spec/helpers');

const set = require('lodash.set');
const chai = require('chai');
const expect = chai.expect;

const ArrayModel = require('../../../spec/models/arrayModel.model');
const update = require('../index');
const utilities = require('../../utilities');

const arrayObjectDate = Date.now();
const arrayObject = {
  string: '10',
  number: 10,
  date: arrayObjectDate,
  boolean: true,
  list: [{
    string: '100',
    number: 100,
    date: arrayObjectDate,
    boolean: true,
    list: [{
      string: '1000',
      number: 1000,
      date: arrayObjectDate,
      boolean: true
    }, {
      string: '1001',
      number: 1001,
      date: arrayObjectDate,
      boolean: true
    }, {
      string: '1002',
      number: 1002,
      date: arrayObjectDate,
      boolean: true
    }]
  }, {
    string: '101',
    number: 101,
    date: arrayObjectDate,
    boolean: true,
    list: [{
      string: '1010',
      number: 1010,
      date: arrayObjectDate,
      boolean: true
    }]
  }]
};

function expectEqual(actual, expected) {
  expect(actual).to.deep.equal(expected);
  if(expected.list !== undefined) {
    expect(actual.list).to.exist;
    expect(actual.list.length).to.equal(expected.list.length);

    for (let i = 0; i < expected.list.length; i ++) {
      expectEqual(actual.list[i], expected.list[i]);
    }
  }
}

describe('update.operation.arrayModel.spec', () => {
  beforeEach(async () => {
    this.update = update.operation.method(
      ArrayModel,
      'arrayModel',
      {
        string: 'body.string',
        number: 'params.number',
        boolean: 'otherRequestObjects.boolean',
        list: [{
          string: 'body.list.$.string',
          number: 'params.listNumber',
          boolean: 'otherRequestObjects.listBoolean',
          list: [{
            string: 'body.list.list.string',
            number: 'params.listListNumber',
            boolean: 'otherRequestObjects.listListBoolean'
          }]
        }]
      }
    );
    this.arrayModel = await ArrayModel.create(arrayObject);

    this.arrayModelObject = this.arrayModel.toJSON();
  });

  describe('root path', () => {
    it('must update a simple model via body', async () => {
      const req = {
        arrayModel: this.arrayModel,
        body:{
          string: 'not string'
        }
      };

      await this.update(req, null, utilities.when);
      const arrayModel = await ArrayModel.findById(this.arrayModel._id);

      this.arrayModelObject.string = 'not string';
      this.arrayModelObject.updatedAt = arrayModel.updatedAt;
      expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
      expectEqual(arrayModel.toJSON(), this.arrayModelObject);
    });

    it('must update a simple model via params', async () => {
      const req = {
        arrayModel: this.arrayModel,
        params:{
          number: 84
        }
      };

      await this.update(req, null, utilities.when);
      const arrayModel = await ArrayModel.findById(this.arrayModel._id);

      this.arrayModelObject.number = 84;
      this.arrayModelObject.updatedAt = arrayModel.updatedAt;
      expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
      expectEqual(arrayModel.toJSON(), this.arrayModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        arrayModel: this.arrayModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      await this.update(req, null, utilities.when);
      const arrayModel = await ArrayModel.findById(this.arrayModel._id);

      this.arrayModelObject.boolean = false;
      this.arrayModelObject.updatedAt = arrayModel.updatedAt;
      expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
      expectEqual(arrayModel.toJSON(), this.arrayModelObject);
    });
  });

  describe('list path', () => {
    for(let i = 0; i < arrayObject.list.length; i++) {
      describe(`list.${i} path`, () => {
        it('must update a simple model via body', async () => {
          const req = {
            arrayModel: this.arrayModel,
            body: {
              list: arrayObject.list.map(() => {
                return null;
              })
            }
          };
          set(req, `body.list.${i}.string`, 'not string');

          await this.update(req, null, utilities.when);
          const arrayModel = await ArrayModel.findById(this.arrayModel._id);

          this.arrayModelObject.list[i].string = 'not string';
          this.arrayModelObject.updatedAt = arrayModel.updatedAt;
          expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
          expectEqual(arrayModel.toJSON(), this.arrayModelObject);
        });
      });
    }

    it('must update a simple model via params', async () => {
      const req = {
        arrayModel: this.arrayModel,
        params: {
          listNumber: 84
        },
        body: {
          list: arrayObject.list.map(() => {
            return null;
          })
        }
      };

      await this.update(req, null, utilities.when);
      const arrayModel = await ArrayModel.findById(this.arrayModel._id);

      this.arrayModelObject.list[0].number = 84;
      this.arrayModelObject.list[1].number = 84;
      this.arrayModelObject.updatedAt = arrayModel.updatedAt;
      expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
      expectEqual(arrayModel.toJSON(), this.arrayModelObject);
    });

    it('must not update a simple model via params if the array is not provided', async () => {
      const req = {
        arrayModel: this.arrayModel,
        params: {
          listNumber: 84
        },
        body: {
          list: []
        }
      };

      await this.update(req, null, utilities.when);
      const arrayModel = await ArrayModel.findById(this.arrayModel._id);

      this.arrayModelObject.updatedAt = arrayModel.updatedAt;
      expect(arrayModel.toJSON()).to.deep.equal(this.arrayModelObject);
      expectEqual(arrayModel.toJSON(), this.arrayModelObject);
    });
  });
});