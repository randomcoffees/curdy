require('./../../../helpers');

const Q = require('q');

const showAll = require('./../../../../lib/showAll');

const SimpleModel = require('./../../../models/simpleModel.model');
describe('curdy.showAll.operation', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.showAll = showAll.operation.method(
          SimpleModel,
          'simpleModel',
          {
            string: 'body.string',
            number: 'params.number',
            boolean: 'otherRequestObjects.boolean'
          }
        );
      })
      .then(() => {
        return SimpleModel.create({
          string: 'string',
          number: 42,
          date: Date.now(),
          boolean: true
        });
      })
      .then(simpleModel => {
        this.simpleModel = simpleModel;
      });
    });

    it('must index a simple model (and do nothing)', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.showAll(req, null, Q.when);
    });
  });
});