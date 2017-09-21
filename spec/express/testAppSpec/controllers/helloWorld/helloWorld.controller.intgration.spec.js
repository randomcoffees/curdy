
const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../express.integrationHelper');

describe('helloWorld.controller.integration.spec', () => {
  beforeEach(() =>{
    expressIntegrationHelper.beforeEach(this);
    this.a = 1;
  });

  it('must render hello world', () => {
    return request(this.app)
    .get('/helloWorld')
    .expect(200)
    .then(function({ body }) {
      expect(body.hello).to.equal('world');
    });
  });
});