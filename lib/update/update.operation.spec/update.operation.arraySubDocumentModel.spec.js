require('../../../spec/helpers');

const set = require('lodash.set');
const chai = require('chai');
const expect = chai.expect;

const ArrayModel = require('../../../spec/models/arraySubDocumentModel.model');
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

describe('update.operation.arraySubDocumentModel.spec', () => {
  beforeEach(async () => {
    this.update = update.operation.method(
      ArrayModel,
      'arraySubDocumentModel',
      {
        string: 'body.string',
        number: 'params.number',
        boolean: 'otherRequestObjects.boolean',
        list: [{
          string: 'body.list.$.string',
          number: 'params.listNumber',
          boolean: 'otherRequestObjects.listBoolean',
          list: [{
            string: 'body.list.$.list.$.string',
            number: 'params.listListNumber',
            boolean: 'otherRequestObjects.listListBoolean'
          }]
        }]
      }
    );
    this.arraySubDocumentModel = await ArrayModel.create(arrayObject);

    this.arraySubDocumentModelObject = this.arraySubDocumentModel.toJSON();
  });

  describe('root path', () => {
    it('must update a simple model via body', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
        body:{
          string: 'not string'
        }
      };

      await this.update(req, null, utilities.when);
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.string = 'not string';
      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });

    it('must update a simple model via params', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
        params:{
          number: 84
        }
      };

      await this.update(req, null, utilities.when);
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.number = 84;
      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });

    it('must create a simple model via other req objects', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
        otherRequestObjects:{
          boolean: false
        }
      };

      await this.update(req, null, utilities.when);
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.boolean = false;
      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });
  });

  describe('list path', () => {
    for(let i = 0; i < arrayObject.list.length; i++) {
      describe(`list.${i} path`, () => {
        it('must update a simple model via body', async () => {
          const req = {
            arraySubDocumentModel: this.arraySubDocumentModel,
            body: {
              list: arrayObject.list.map(() => {
                return null;
              })
            }
          };
          set(req, `body.list.${i}.string`, 'not string');

          await this.update(req, null, utilities.when);
          const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

          this.arraySubDocumentModelObject.__v = 1;
          this.arraySubDocumentModelObject.list[i].string = 'not string';
          this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
          expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
        });
      });
    }

    it('must update a simple model via params', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
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
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.list[0].number = 84;
      this.arraySubDocumentModelObject.list[1].number = 84;
      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });

    it('must not update a simple model via params if the array is not provided', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
        params: {
          listNumber: 84
        },
        body: {
          list: []
        }
      };

      await this.update(req, null, utilities.when);
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });
  });

  describe('list.0.list path', () => {
    for(let i = 0; i < arrayObject.list[0].list.length; i++) {
      describe(`list.0.list.${i} path`, () => {
        it('must update a simple model via body', async () => {
          const req = {
            arraySubDocumentModel: this.arraySubDocumentModel,
            body: {
              list: [{
                list: arrayObject.list[0].list.map(() => {
                  return null;
                })
              }]
            }
          };
          set(req, `body.list.0.list.${i}.string`, 'not string');

          await this.update(req, null, utilities.when);
          const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

          this.arraySubDocumentModelObject.__v = 1;
          this.arraySubDocumentModelObject.list[0].list[i].string = 'not string';
          this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
          expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
        });
      });
    }

    it('must update a simple model via params', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
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
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.list[0].number = 84;
      this.arraySubDocumentModelObject.list[1].number = 84;
      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });

    it('must not update a simple model via params if the array is not provided', async () => {
      const req = {
        arraySubDocumentModel: this.arraySubDocumentModel,
        params: {
          listNumber: 84
        },
        body: {
          list: []
        }
      };

      await this.update(req, null, utilities.when);
      const arraySubDocumentModel = await ArrayModel.findById(this.arraySubDocumentModel._id);

      this.arraySubDocumentModelObject.updatedAt = arraySubDocumentModel.updatedAt;
      this.arraySubDocumentModelObject.__v = 1;
      expect(arraySubDocumentModel.toJSON()).to.deep.equal(this.arraySubDocumentModelObject);
    });
  });
});