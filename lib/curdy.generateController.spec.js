require('../spec/helpers');
const chai = require('chai');
const expect = chai.expect;
const curdy = require('./curdy');
const SimpleModel = require('../spec/models/simpleModel.model');

describe('curdy.generateController.spec', () => {
  describe('controller options', () => {
    beforeEach(async () => {
      this.simpleModel = await SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      });

      this.template = {
        find: { // Find Template
          _id: 'params._id'
        },
        operation: { // Operation Template
          string: 'body.string',
          number: 'body.number',
          boolean: 'body.boolean'
        },
        render: { // Render Template
          _id: '_id',
          string: 'string',
          number: 'number',
          boolean: 'boolean'
        }
      };
    });

    it('should generate a controller with a custom req.model.path', async () => {
      const controller = curdy.generateController(SimpleModel, this.template, {
        req: {
          model: {
            path: 'notCurdy.modelSimple'
          }
        }
      }).controller();
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };
      const res = {};
      const next = () => {
        return Promise.resolve();
      };

      await controller.show.find(req, res, next);

      expect(req.notCurdy.modelSimple._id.toString()).to.equal(this.simpleModel._id.toString());
    });

  });
});
