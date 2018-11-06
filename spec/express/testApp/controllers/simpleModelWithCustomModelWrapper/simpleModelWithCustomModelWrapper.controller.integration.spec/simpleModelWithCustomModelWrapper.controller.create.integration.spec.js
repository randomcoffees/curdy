
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('../../../../../models/simpleModel.model');
const expressIntegrationHelper = require('../../../express.integrationHelper');

describe('simpleModelWithCustomModelWrapper.controller.create.integration.spec', () => {
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

  it('must create a SimpleModel', () => {
    return request(this.app)
    .post('/simpleModelWithCustomModelWrapper')
    .send({
      string: 'not string',
      number: 43,
      boolean: false
    })
    .expect(201)
    .then(({ body }) => {
      expect(body.simpleModelWithCustomModelWrapper.string).to.equal('not string');
      expect(body.simpleModelWithCustomModelWrapper.number).to.equal(43);
      expect(body.simpleModelWithCustomModelWrapper.boolean).to.equal(false);

      return SimpleModel.findById(body.simpleModelWithCustomModelWrapper._id);
    })
    .then((simpleModel) => {
      expect(simpleModel.string).to.equal('not string');
      expect(simpleModel.number).to.equal(43);
      expect(simpleModel.boolean).to.equal(false);
    });
  });
});