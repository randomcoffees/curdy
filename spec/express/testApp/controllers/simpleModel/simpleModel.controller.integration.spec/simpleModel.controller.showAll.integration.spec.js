const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

describe('simpleModel.controller.showAll.integration.spec', () => {
  beforeEach(async () => {
    expressIntegrationHelper.beforeEach(this);

    this.SimpleModel = require('../../../../../models/simpleModel.model');

    await this.SimpleModel.remove({});
    this.simpleModels = await Promise.all([
      this.SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      }),
      this.SimpleModel.create({
        string: 'not string',
        number: 43,
        date: Date.now(),
        boolean: false
      })
    ]);
  });

  it('must render a SimpleModel', async () => {
    const response = await request(this.app)
    .get('/simpleModel');

    expect(response.statusCode).to.equal(200);
    expect(response.body.length).to.equal(this.simpleModels.length);
    this.simpleModels.forEach((simpleModel) => {
      expect(response.body).to.deep.contain({
        _id: simpleModel._id.toString(),
        string: simpleModel.string,
        number: simpleModel.number,
        boolean: simpleModel.boolean,
      });
    });
  });
});