const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/orderBy/ascending';

describe('orderByAscending.controller.integration.spec', () => {
  beforeEach(() => {
    const date = new Date();
    expressIntegrationHelper.beforeEach(this);

    this.OrderedModel = require('./../../../../testApp/controllers/plugins/orderBy/orderedModel.model');

    return this.OrderedModel.remove({})
    .then(() => {
      return Promise.all([
        this.OrderedModel.create({
          name: 'name',
          createdAt: date.setSeconds(date.getSeconds() - 1)
        }),
        this.OrderedModel.create({
          name: 'not name',
          createdAt: date.setSeconds(date.getSeconds() - 2)
        }),
        this.OrderedModel.create({
          name: 'not not name',
          createdAt: date.setSeconds(date.getSeconds() - 3)
        }),
        this.OrderedModel.create({
          name: 'not not not name',
          createdAt: date.setSeconds(date.getSeconds() - 4)
        })
      ]);
    })
    .then((orderedModels) => {
      this.orderedModels = orderedModels.sort((firstModel, secondModel) => {
        return firstModel.createdAt.getTime() - secondModel.createdAt.getTime();
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

    describe('user overriding the sort', () => {
      it('must allow the user to sort createdAt desc', () => {
        this.orderedModels.reverse();

        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:desc`)
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

      it('must allow the user to sort createdAt asc', () => {
        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:asc`)
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

      describe('user overriding the sort by a different key', () => {
        beforeEach(() => {
          this.orderedModels = this.orderedModels.sort((firstModel, secondModel) => {
            if (firstModel.name < secondModel.name) {
              return -1;
            }
            if (firstModel.name > secondModel.name) {
              return 1;
            }
            return 0;
          });
        });

        it('must allow the user to sort name asc', () => {
          return request(this.app)
          .get(`${BASE_URI}/?sort=name:asc`)
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

        it('must allow the user to sort name desc', () => {
          this.orderedModels.reverse();
          return request(this.app)
          .get(`${BASE_URI}/?sort=name:desc`)
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
  });
});