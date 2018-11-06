const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleSortModel = require('./../../../../testApp/controllers/plugins/simpleSort/simpleSortModel.model');
const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/simpleSort/regression';

describe('simpleSortRegression.controller.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);


    return SimpleSortModel.create({
      name: 'name',
    })
    .then((simpleSortModel) => {
      this.simpleSortModel = simpleSortModel;
    });
  });

  describe('create', () => {
    it('must create a SimpleSortModel', () => {
      return request(this.app)
      .post(`${BASE_URI}`)
      .send({
        name: 'not name',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.simpleSortModel.name).to.equal('not name');

        return SimpleSortModel.findById(body.simpleSortModel._id);
      })
      .then((simpleSortModel) => {
        expect(simpleSortModel.name).to.equal('not name');
      });
    });
  });

  describe('delete', () => {
    it('must delete a SimpleSortModel', () => {
      return request(this.app)
      .delete(`${BASE_URI}/${this.simpleSortModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleSortModel.success).to.equal(true);

        return SimpleSortModel.count({ _id: this.simpleSortModel._id });
      })
      .then((simpleSortModelCount) => {
        expect(simpleSortModelCount).to.equal(0);
      });
    });
  });

  describe('show', () => {
    it('must render a SimpleSortModel', () => {
      return request(this.app)
      .get(`${BASE_URI}/${this.simpleSortModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleSortModel.string).to.equal(this.simpleSortModel.string);
        expect(body.number).to.equal(this.simpleSortModel.number);
        expect(body.boolean).to.equal(this.simpleSortModel.boolean);
      });
    });
  });

  describe('showAll', () => {
    beforeEach(() => {
      return SimpleSortModel.remove({})
      .then(() => {
        return Promise.all([
          SimpleSortModel.create({
            name: 'name'
          }),
          SimpleSortModel.create({
            name: 'not name'
          }),
          SimpleSortModel.create({
            name: 'not not name'
          }),
          SimpleSortModel.create({
            name: 'not not not name'
          })
        ]);
      })
      .then((simpleSortModels) => {
        this.simpleSortModels = simpleSortModels;
      });
    });

    it('must render a SimpleSortModel', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleSortModels.length).to.equal(this.simpleSortModels.length);
        this.simpleSortModels.forEach((simpleSortModel) => {
          expect(body.simpleSortModels).to.deep.contain({
            _id: simpleSortModel._id.toString(),
            name: simpleSortModel.name,
            createdAt: simpleSortModel.createdAt.toISOString(),
            updatedAt: simpleSortModel.updatedAt.toISOString(),
          });
        });
      });
    });
  });

  describe('update', () => {
    it('must create a SimpleSortModel', () => {
      return request(this.app)
      .put(`${BASE_URI}/${this.simpleSortModel._id}`)
      .send({
        name: 'not name',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleSortModel._id).to.equal(this.simpleSortModel._id.toString());
        expect(body.simpleSortModel.name).to.equal('not name');

        return SimpleSortModel.findById(body.simpleSortModel._id);
      })
      .then((simpleSortModel) => {
        expect(simpleSortModel.name).to.equal('not name');
      });
    });
  });
});