require('../../../spec/helpers');

const set = require('lodash.set');
const chai = require('chai');
const expect = chai.expect;

const ArrayModel = require('../../../spec/models/arrayListModel.model');
const update = require('../index');
const utilities = require('../../utilities');

const arrayObjectDate = Date.now();
const arrayObject = {
  string: '10',
  number: 10,
  date: arrayObjectDate,
  boolean: true,
  list: [0, 1, 2]
};

describe('update.operation.arrayListModel.spec', () => {
  beforeEach(async () => {
    this.update = update.operation.method(
      ArrayModel,
      'arrayListModel',
      {
        string: 'body.string',
        number: 'params.number',
        boolean: 'otherRequestObjects.boolean',
        list: ['body.list.$']
      }
    );
    this.arrayListModel = await ArrayModel.create(arrayObject);

    this.arrayListModelObject = this.arrayListModel.toJSON();
  });


  for(let i = 0; i < arrayObject.list.length; i++) {
    describe(`list.${i} path`, () => {
      it('must update a simple model via body', async () => {
        const req = {
          arrayListModel: this.arrayListModel,
          body: {
            list: arrayObject.list.map(() => {
              return null;
            })
          }
        };
        set(req, `body.list.${i}`, 100);

        await this.update(req, null, utilities.when);
        const arrayListModel = await ArrayModel.findById(this.arrayListModel._id);

        this.arrayListModelObject.__v = 1;
        this.arrayListModelObject.list = [null, null, null];
        set(this.arrayListModelObject, `list.${i}`, 100);
        this.arrayListModelObject.updatedAt = arrayListModel.updatedAt;
        expect(arrayListModel.toJSON()).to.deep.equal(this.arrayListModelObject);
      });
    });
  }
});