const Q = require('q');
const chai = require('chai');
const request = require('supertest-as-promised');

const expect = chai.expect;

const expressIntegrationHelper = require('./../../express.integrationHelper');

describe('simpleModel.controller.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);

    this.SimpleModel = require('./../../../testApp/controllers/simpleModel/simpleModel.model');

    return this.SimpleModel.create({
      string: 'string',
      number: 42,
      date: Date.now(),
      boolean: true,
    }).then(simpleModel => {
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

        expect(body.string).to.equal('123');
        expect(body.paramString).to.equal('123');
        expect(body.number).to.equal(43);
        expect(body.boolean).to.equal(false);

        return this.SimpleModel.findById(body._id);
      })
      .then(simpleModel => {
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
        expect(body.success).to.equal(true);

        return this.SimpleModel.count({ _id: this.simpleModel._id});
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
        expect(body.string).to.equal(this.simpleModel.string);
        expect(body.paramString).to.equal('asd');
        expect(body.number).to.equal(this.simpleModel.number);
        expect(body.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });

  describe('showAll', () => {
    beforeEach(() => {
      return this.SimpleModel.remove({})
      .then(() => {
        return Q.all([
          this.SimpleModel.create({
            string: '123',
            number: 42,
            date: Date.now(),
            boolean: true
          }),
          this.SimpleModel.create({
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
      .get('/simpleModelWithRouteParams/123')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(1);
        expect(body[0].string).to.equal('123');
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
        expect(body._id).to.equal(this.simpleModel._id.toString());
        expect(body.string).to.equal(newString);
        expect(body.number).to.equal(43);
        expect(body.boolean).to.equal(false);

        return this.SimpleModel.findById(body._id);
      })
      .then((simpleModel) => {
        expect(simpleModel.string).to.equal(newString);
        expect(simpleModel.number).to.equal(43);
        expect(simpleModel.boolean).to.equal(false);
      });
    });
  });

});
