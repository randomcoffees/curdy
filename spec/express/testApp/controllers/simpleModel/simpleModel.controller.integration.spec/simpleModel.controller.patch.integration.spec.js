const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

describe('simpleModel.controller.patch.integration.spec', () => {
  beforeEach(async () => {
    expressIntegrationHelper.beforeEach(this);

    this.SimpleModel = require('../../../../../models/simpleModel.model');

    this.simpleModel = await this.SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true
    });
  });

  it('must patch a SimpleModel', async () => {
    const response = await request(this.app)
    .patch(`/simpleModel/${this.simpleModel._id}`)
    .send({
      string: 'not string',
      boolean: false
    });

    // console.log({ response });
    expect(response.statusCode).to.equal(200);

    expect(response.body._id).to.equal(this.simpleModel._id.toString());
    expect(response.body.string).to.equal('not string');
    expect(response.body.number).to.equal(42);
    expect(response.body.boolean).to.equal(false);

    const simpleModel = await this.SimpleModel.findById(this.simpleModel._id);

    expect(simpleModel.string).to.equal('not string');
    expect(simpleModel.number).to.equal(42);
    expect(simpleModel.boolean).to.equal(false);
  });
});