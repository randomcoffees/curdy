require('./../../../helpers');

const Q = require('q');

const SimpleModel = require('./../../../models/simpleModel.model');
const show = require('./../../../../lib/show');

describe('curdy.show.operation', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.show = show.operation.method(
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

    it('must show a simple model (and do nothing)', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.show(req, null, Q.when);
    });
  });
});