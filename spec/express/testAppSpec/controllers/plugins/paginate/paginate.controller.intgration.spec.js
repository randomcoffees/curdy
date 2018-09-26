const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/pagination/';

describe('orderByAscending.controller.integration.spec', () => {
  beforeEach(() => {
    const date = new Date();
    expressIntegrationHelper.beforeEach(this);

    this.PaginationModel = require('./../../../../testApp/controllers/plugins/pagination/paginationModel.model');

    return this.PaginationModel.remove({})
    .then(() => {
      return Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map((index) => {
        return this.PaginationModel.create({
          name: `name ${index}`,
          createdAt: date.setSeconds(date.getSeconds() - index)
        });
      }));
    })
    .then((paginationModels) => {
      this.paginationModels = paginationModels.sort((firstModel, secondModel) => {
        return firstModel.createdAt.getTime() - secondModel.createdAt.getTime();
      });
    });
  });

  describe('showAll', () => {
    it('must render the first 20 PaginationModels in ascending order', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(20);
        expect(body).to.deep.equal(this.paginationModels.slice(0, 20).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the skip', () => {
      return request(this.app)
      .get(`${BASE_URI}/?skip=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(20);
        expect(body).to.deep.equal(this.paginationModels.slice(2, 22).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the limit', () => {
      return request(this.app)
      .get(`${BASE_URI}/?limit=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(2);
        expect(body).to.deep.equal(this.paginationModels.slice(0, 2).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the limit', () => {
      return request(this.app)
      .get(`${BASE_URI}/?limit=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(2);
        expect(body).to.deep.equal(this.paginationModels.slice(0, 2).map((orderedModel) => {
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