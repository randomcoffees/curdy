require('../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const { pluralize } = require('../utilities');

describe('utilities.pluralize.spec', () => {
  describe('normal pluralization\'s', () => {
    it('must pluralize cow', () => {
      expect(pluralize('cow')).to.equal('cows');
    });

    it('must not pluralize cows', () => {
      expect(pluralize('cows')).to.equal('cows');
    });
  });

  describe('complex pluralization\'s', () => {
    it('must pluralize goose', () => {
      expect(pluralize('goose')).to.equal('geese');
    });

    it('must not pluralize geese', () => {
      expect(pluralize('geese')).to.equal('geese');
    });
  });
});