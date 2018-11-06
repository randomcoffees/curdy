
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('./../../../../../models/simpleModel.model');
const expressIntegrationHelper = require('./../../../express.integrationHelper');

describe('simpleModel.controller.create.integration.spec', () => {
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
    .post('/simpleModel')
    .send({
      string: 'not string',
      number: 43,
      boolean: false
    })
    .expect(201)
    .then(({ body }) => {
      expect(body.simpleModel.string).to.equal('not string');
      expect(body.simpleModel.number).to.equal(43);
      expect(body.simpleModel.boolean).to.equal(false);

      return SimpleModel.findById(body.simpleModel._id);
    })
    .then((simpleModel) => {
      expect(simpleModel.string).to.equal('not string');
      expect(simpleModel.number).to.equal(43);
      expect(simpleModel.boolean).to.equal(false);
    });
  });
});