const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const ArraySubDocumentModel = require('./../../../../../models/arraySubDocumentModel.model');
const expressIntegrationHelper = require('../../../express.integrationHelper');

const BASE_URI = '/plugins/arraySubDocument';

const arrayObjectDate = Date.now();
const arrayObject = {
  string: '10',
  number: 10,
  date: arrayObjectDate,
  boolean: true,
  list: [{
    string: '100',
    number: 100,
    date: arrayObjectDate,
    boolean: true,
    list: [{
      string: '1000',
      number: 1000,
      date: arrayObjectDate,
      boolean: true
    }, {
      string: '1001',
      number: 1001,
      date: arrayObjectDate,
      boolean: true
    }, {
      string: '1002',
      number: 1002,
      date: arrayObjectDate,
      boolean: true
    }]
  }, {
    string: '101',
    number: 101,
    date: arrayObjectDate,
    boolean: true,
    list: [{
      string: '1010',
      number: 1010,
      date: arrayObjectDate,
      boolean: true
    }]
  }, {
    string: '102',
    number: 102,
    date: arrayObjectDate,
    boolean: true,
    list: [{
      string: '1020',
      number: 1020,
      date: arrayObjectDate,
      boolean: true
    }]
  }]
};

describe('orderByAscending.controller.integration.spec', () => {
  beforeEach(async () => {
    expressIntegrationHelper.beforeEach(this);

    this.arraySubDocumentModel = await ArraySubDocumentModel.create(arrayObject);
  });

  describe.only('update', () => {
    describe('updating array elements', () => {

      it('must be able to update the first element in an array by _id', async () => {
        const string = 'Late Night Therapy';

        const response = await request(this.app)
        .put(`${BASE_URI}/${this.arraySubDocumentModel._id}`)
        .send({
          list: [{
            _id: this.arraySubDocumentModel.list[0]._id.toString(),
            string
          }]
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.arraySubDocumentModel.list.length).to.equal(3);

        expect(response.body.arraySubDocumentModel.list[0].string).to.equal(string);
        expect(response.body.arraySubDocumentModel.list[1].string).to.equal(this.arraySubDocumentModel.list[1].string);
        expect(response.body.arraySubDocumentModel.list[2].string).to.equal(this.arraySubDocumentModel.list[2].string);
      });

      it('must be able to update the second element in an array by _id', async () => {
        const number = 99;

        const response = await request(this.app)
        .put(`${BASE_URI}/${this.arraySubDocumentModel._id}`)
        .send({
          list: [{
            _id: this.arraySubDocumentModel.list[1]._id.toString(),
            number
          }]
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.arraySubDocumentModel.list.length).to.equal(3);

        expect(response.body.arraySubDocumentModel.list[0].number).to.equal(this.arraySubDocumentModel.list[0].number);
        expect(response.body.arraySubDocumentModel.list[1].number).to.equal(number);
        expect(response.body.arraySubDocumentModel.list[2].number).to.equal(this.arraySubDocumentModel.list[2].number);
      });

      it('must be able to update the third element in an array by _id', async () => {
        const boolean = false;

        const response = await request(this.app)
        .put(`${BASE_URI}/${this.arraySubDocumentModel._id}`)
        .send({
          list: [{
            _id: this.arraySubDocumentModel.list[2]._id.toString(),
            boolean
          }]
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.arraySubDocumentModel.list.length).to.equal(3);

        expect(response.body.arraySubDocumentModel.list[0].boolean).to.equal(this.arraySubDocumentModel.list[0].boolean);
        expect(response.body.arraySubDocumentModel.list[1].boolean).to.equal(this.arraySubDocumentModel.list[1].boolean);
        expect(response.body.arraySubDocumentModel.list[2].boolean).to.equal(boolean);
      });
    });

    describe('creating array elements', () => {
      it('must be able to append an array element', async () => {
        const response = await request(this.app)
        .put(`${BASE_URI}/${this.arraySubDocumentModel._id}`)
        .send({
          list: [{
            string: '103',
            number: 103,
            boolean: true
          }]
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.arraySubDocumentModel.list.length).to.equal(4);

        expect(response.body.arraySubDocumentModel.list[0].string).to.equal(this.arraySubDocumentModel.list[0].string);
        expect(response.body.arraySubDocumentModel.list[1].string).to.equal(this.arraySubDocumentModel.list[1].string);
        expect(response.body.arraySubDocumentModel.list[2].string).to.equal(this.arraySubDocumentModel.list[2].string);
        expect(response.body.arraySubDocumentModel.list[3].string).to.equal('103');
      });
    });
  });
});