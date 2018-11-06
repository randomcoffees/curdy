require('../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const { singularize } = require('../utilities');

describe('utilities.singularize.spec', () => {
  describe('normal pluralization\'s', () => {
    it('must not singularize cow', () => {
      expect(singularize('cow')).to.equal('cow');
    });

    it('must singularize cows', () => {
      expect(singularize('cows')).to.equal('cow');
    });
  });

  describe('complex pluralization\'s', () => {
    it('must not singularize goose', () => {
      expect(singularize('goose')).to.equal('goose');
    });

    it('must singularize geese', () => {
      expect(singularize('geese')).to.equal('goose');
    });
  });
});