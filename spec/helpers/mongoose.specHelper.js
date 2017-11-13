const Q = require('q');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
console.log(-1);

before(() => {
  console.log(0);
  return Q.when(mockgoose.prepareStorage())
  .then(() => {
    console.log(1);
    return Q.when(mongoose.connection.close());
  })
  .then(() => {
    console.log(2);
    return Q.when(mongoose.connect('mongodb://example.com/TestingDB'));
  });
});

beforeEach(() => {
  console.log(3);
  return Q.when(Object.keys(mongoose.connection.models).forEach(modelKey => {
    console.log(4);
    delete mongoose.connection.models[modelKey];
  }));
});