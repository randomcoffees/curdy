const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const SimpleModel = require('./../../../../models/simpleModel.model');
const expressIntegrationHelper = require('../../express.integrationHelper');

describe('simpleModel.controller.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);


    return SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true,
    }).then((simpleModel) => {
      this.simpleModel = simpleModel;
    });
  });

  describe('create', () => {
    it('must create a SimpleModel', () => {
      return request(this.app)
      .post('/simpleModelWithRouteParams/123')
      .send({
        string: 'not string',
        number: 43,
        boolean: false,
      })
      .expect(201)
      .then(({ body }) => {

        expect(body.simpleModel.string).to.equal('123');
        expect(body.simpleModel.paramString).to.equal('123');
        expect(body.simpleModel.number).to.equal(43);
        expect(body.simpleModel.boolean).to.equal(false);

        return SimpleModel.findById(body.simpleModel._id);
      })
      .then((simpleModel) => {
        expect(simpleModel.string).to.equal('123');
        expect(simpleModel.number).to.equal(43);
        expect(simpleModel.boolean).to.equal(false);
      });
    });
  });

  describe('delete', () => {
    it('must delete a SimpleModel', () => {
      return request(this.app)
      .delete(`/simpleModelWithRouteParams/123/${this.simpleModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleModel.success).to.equal(true);

        return SimpleModel.count({ _id: this.simpleModel._id });
      })
      .then((simpleModelCount) => {
        expect(simpleModelCount).to.equal(0);
      });
    });
  });

  describe('show', () => {
    it('must render a SimpleModel', () => {
      return request(this.app)
      .get(`/simpleModelWithRouteParams/asd/${this.simpleModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleModel.string).to.equal(this.simpleModel.string);
        expect(body.simpleModel.paramString).to.equal('asd');
        expect(body.simpleModel.number).to.equal(this.simpleModel.number);
        expect(body.simpleModel.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });

  describe('showAll', () => {
    beforeEach(() => {
      return SimpleModel.remove({})
      .then(() => {
        return Promise.all([
          SimpleModel.create({
            string: '123',
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
    });

    it('must render a SimpleModel', () => {
      return request(this.app)
      .get('/simpleModelWithRouteParams/1234')
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleModels.length).to.equal(2);

        expect(body.simpleModels[0].paramString).to.equal('1234');
        expect(body.simpleModels[1].paramString).to.equal('1234');
      });
    });
  });

  describe('update', () => {
    it('must create a SimpleModel', () => {
      const newString = 'asdfoasidjf';
      return request(this.app)
      .put(`/simpleModelWithRouteParams/${newString}/${this.simpleModel._id}`)
      .send({
        string: 'not string',
        number: 43,
        boolean: false
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.simpleModel._id).to.equal(this.simpleModel._id.toString());
        expect(body.simpleModel.string).to.equal(newString);
        expect(body.simpleModel.number).to.equal(43);
        expect(body.simpleModel.boolean).to.equal(false);

        return SimpleModel.findById(body.simpleModel._id);
      })
      .then((simpleModel) => {
        expect(simpleModel.string).to.equal(newString);
        expect(simpleModel.number).to.equal(43);
        expect(simpleModel.boolean).to.equal(false);
      });
    });
  });

});
