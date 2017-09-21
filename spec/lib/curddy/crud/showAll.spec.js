require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');

const curddy = require('./../../../../lib/curddy');

describe('curddy.crud.showAll', () => {
  describe('simple models', () => {
    beforeEach(() =>{
      return Q.when()
      .then(() => {
        this.SimpleModel = mongoose.model('SimpleModel', new mongoose.Schema({
          string: String,
          number: Number,
          date: Date,
          boolean: Boolean
        }, {
          timestamps: false,
        }));

        this.showAll = curddy.crud.showAll(
          this.SimpleModel,
          'simpleModel',
          {
            string: 'body.string',
            number: 'params.number',
            boolean: 'otherRequestObjects.boolean'
          }
        );
      })
      .then(() => {
        return this.SimpleModel.create({
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