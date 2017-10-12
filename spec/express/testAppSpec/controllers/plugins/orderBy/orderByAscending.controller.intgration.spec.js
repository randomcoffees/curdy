const Q = require('q');
const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/orderBy/ascending';

describe('orderByAscending.controller.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);

    this.OrderedModel = require('./../../../../testApp/controllers/plugins/orderBy/orderedModel.model');

    return this.OrderedModel.remove({})
    .then(() => {
      return Q.all([
        this.OrderedModel.create({
          name: 'name'
        }),
        this.OrderedModel.create({
          name: 'not name'
        }),
        this.OrderedModel.create({
          name: 'not not name'
        }),
        this.OrderedModel.create({
          name: 'not not not name'
        })
      ]);
    })
    .then((orderedModels) => {
      this.orderedModels = orderedModels.sort((firstModel, secondModel) => {
        return firstModel.createdAt - secondModel.createdAt;
      });
    });
  });

  describe('showAll', () => {
    it('must render OrderedModels in ascending order', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(this.orderedModels.length);
        expect(body).to.deep.equal(this.orderedModels.map(orderedModel => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });
  });
});