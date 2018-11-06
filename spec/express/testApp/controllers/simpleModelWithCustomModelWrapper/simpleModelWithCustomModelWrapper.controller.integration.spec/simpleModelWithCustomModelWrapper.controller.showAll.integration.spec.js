const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('../../../../../models/simpleModel.model');
const expressIntegrationHelper = require('../../../express.integrationHelper');

describe('simpleModelWithCustomModelWrapper.controller.showAll.integration.spec', () => {
  beforeEach(async () => {
    expressIntegrationHelper.beforeEach(this);


    await SimpleModel.remove({});
    this.simpleModels = await Promise.all([
      SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      }),
      SimpleModel.create({
        string: 'not string',
        number: 43,
        date: Date.now(),
        boolean: false
      })
    ]);
  });

  it('must render a SimpleModel', async () => {
    const response = await request(this.app)
    .get('/simpleModelWithCustomModelWrapper');

    expect(response.statusCode).to.equal(200);
    expect(response.body.simpleModelWithCustomModelWrapperz.length).to.equal(this.simpleModels.length);
    this.simpleModels.forEach((simpleModel) => {
      expect(response.body.simpleModelWithCustomModelWrapperz).to.deep.contain({
        _id: simpleModel._id.toString(),
        string: simpleModel.string,
        number: simpleModel.number,
        boolean: simpleModel.boolean,
      });
    });
  });
});