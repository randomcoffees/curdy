
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

describe('simpleModel.controller.delete.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);

    this.SimpleModel = require('../../../../../models/simpleModel.model');

    return this.SimpleModel.create({
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
    .delete(`/simpleModel/${this.simpleModel._id}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.success).to.equal(true);

      return this.SimpleModel.count({ _id: this.simpleModel._id });
    })
    .then((simpleModelCount) => {
      expect(simpleModelCount).to.equal(0);
    });
  });
});