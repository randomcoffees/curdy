const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('../../../../../models/simpleModel.model');
const expressIntegrationHelper = require('./../../../express.integrationHelper');

describe('simpleModel.controller.show.integration.spec', () => {
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

  it('must render a SimpleModel', () => {
    return request(this.app)
    .get(`/simpleModel/${this.simpleModel._id}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.string).to.equal(this.simpleModel.string);
      expect(body.number).to.equal(this.simpleModel.number);
      expect(body.boolean).to.equal(this.simpleModel.boolean);
    });
  });
});