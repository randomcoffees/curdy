
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('../../../../../models/simpleModel.model');
const expressIntegrationHelper = require('../../../express.integrationHelper');

describe('simpleModelWithCustomModelWrapper.controller.delete.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);


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

  it('must delete a SimpleModel', () => {
    return request(this.app)
    .delete(`/simpleModelWithCustomModelWrapper/${this.simpleModel._id}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.simpleModelWithCustomModelWrapper.success).to.equal(true);

      return SimpleModel.count({ _id: this.simpleModel._id });
    })
    .then((simpleModelCount) => {
      expect(simpleModelCount).to.equal(0);
    });
  });
});