require('./../../../helpers');

const Q = require('q');
const mongoose = require('mongoose');

const curddy = require('./../../../../lib/curddy');

describe('curddy.crud.show', () => {
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

        this.show = curddy.crud.show(
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

    it('must show a simple model (and do nothing)', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.show(req, null, Q.when);
    });
  });
});