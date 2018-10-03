require('./../../spec/helpers');

const showAll = require('.');
const utilities = require('../utilities');

const SimpleModel = require('../../spec/models/simpleModel.model');
describe('curdy.showAll.operation', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.showAll = showAll.operation.method(
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

    it('must index a simple model (and do nothing)', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.showAll(req, null, utilities.when);
    });
  });
});