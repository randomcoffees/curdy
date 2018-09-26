const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/simpleSort/descending';

describe('simpleSortDescending.controller.integration.spec', () => {
  beforeEach(() => {
    const date = new Date();
    expressIntegrationHelper.beforeEach(this);

    this.SimpleSortModel = require('./../../../../testApp/controllers/plugins/simpleSort/simpleSortModel.model');

    return this.SimpleSortModel.remove({})
    .then(() => {
      return Promise.all([
        this.SimpleSortModel.create({
          name: 'name',
          createdAt: date.setSeconds(date.getSeconds() - 1)
        }),
        this.SimpleSortModel.create({
          name: 'not name',
          createdAt: date.setSeconds(date.getSeconds() - 2)
        }),
        this.SimpleSortModel.create({
          name: 'not not name',
          createdAt: date.setSeconds(date.getSeconds() - 3)
        }),
        this.SimpleSortModel.create({
          name: 'not not not name',
          createdAt: date.setSeconds(date.getSeconds() - 4)
        })
      ]);
    })
    .then((simpleSortModels) => {
      this.simpleSortModels = simpleSortModels.sort((firstModel, secondModel) => {
        return secondModel.createdAt.getTime() - firstModel.createdAt.getTime();
      });
    });
  });

  describe('showAll', () => {
    it('must render SimpleSortModels in descending order', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(this.simpleSortModels.length);
        expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
          return {
            _id: simpleSortModel._id.toString(),
            name: simpleSortModel.name,
            createdAt: simpleSortModel.createdAt.toISOString(),
            updatedAt: simpleSortModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    describe('user overriding the sort', () => {
      it('must allow the user to sort createdAt asc', () => {
        this.simpleSortModels.reverse();

        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:asc`)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).to.equal(this.simpleSortModels.length);
          expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
            return {
              _id: simpleSortModel._id.toString(),
              name: simpleSortModel.name,
              createdAt: simpleSortModel.createdAt.toISOString(),
              updatedAt: simpleSortModel.updatedAt.toISOString(),
            };
          }));
        });
      });

      it('must allow the user to sort createdAt desc', () => {
        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:desc`)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).to.equal(this.simpleSortModels.length);
          expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
            return {
              _id: simpleSortModel._id.toString(),
              name: simpleSortModel.name,
              createdAt: simpleSortModel.createdAt.toISOString(),
              updatedAt: simpleSortModel.updatedAt.toISOString(),
            };
          }));
        });
      });

      describe('user overriding the sort by a different key', () => {
        beforeEach(() => {
          this.simpleSortModels = this.simpleSortModels.sort((firstModel, secondModel) => {
            return secondModel.updatedAt.getTime() - firstModel.updatedAt.getTime();
          });
        });

        it('must allow the user to sort updatedAt asc', () => {
          this.simpleSortModels.reverse();
          return request(this.app)
          .get(`${BASE_URI}/?sort=u:asc`)
          .expect(200)
          .then(({ body }) => {
            expect(body.length).to.equal(this.simpleSortModels.length);
            expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
              return {
                _id: simpleSortModel._id.toString(),
                name: simpleSortModel.name,
                createdAt: simpleSortModel.createdAt.toISOString(),
                updatedAt: simpleSortModel.updatedAt.toISOString(),
              };
            }));
          });
        });

        it('must allow the user to sort updatedAt desc', () => {
          return request(this.app)
          .get(`${BASE_URI}/?sort=u:desc`)
          .expect(200)
          .then(({ body }) => {
            expect(body.length).to.equal(this.simpleSortModels.length);
            expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
              return {
                _id: simpleSortModel._id.toString(),
                name: simpleSortModel.name,
                createdAt: simpleSortModel.createdAt.toISOString(),
                updatedAt: simpleSortModel.updatedAt.toISOString(),
              };
            }));
          });
        });
      });

      describe('user overriding the sort by an invalid key', () => {
        it('must not allow the user to sort name asc', () => {
          return request(this.app)
          .get(`${BASE_URI}/?sort=name:asc`)
          .expect(200)
          .then(({ body }) => {
            expect(body.length).to.equal(this.simpleSortModels.length);
            expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
              return {
                _id: simpleSortModel._id.toString(),
                name: simpleSortModel.name,
                createdAt: simpleSortModel.createdAt.toISOString(),
                updatedAt: simpleSortModel.updatedAt.toISOString(),
              };
            }));
          });
        });

        it('must not allow the user to sort name desc', () => {
          return request(this.app)
          .get(`${BASE_URI}/?sort=name:desc`)
          .expect(200)
          .then(({ body }) => {
            expect(body.length).to.equal(this.simpleSortModels.length);
            expect(body).to.deep.equal(this.simpleSortModels.map((simpleSortModel) => {
              return {
                _id: simpleSortModel._id.toString(),
                name: simpleSortModel.name,
                createdAt: simpleSortModel.createdAt.toISOString(),
                updatedAt: simpleSortModel.updatedAt.toISOString(),
              };
            }));
          });
        });
      });
    });
  });
});